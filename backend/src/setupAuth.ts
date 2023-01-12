/* eslint-disable no-underscore-dangle */
import ThirdParty, { Github, Google } from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';
import SuperTokens from 'supertokens-node';

import PageModel from './models/pageModel';
import UserModel from './models/userModel';
import PageMapModel from './models/pageMap';
import PageTreeModel from './models/pageTreeModel';

const setupAuth = () => {
  // -=- Add OAuth Keys -=-
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
  } = process.env;

  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
  } = process.env;

  // -=- Check OAuth Keys Exist -=-
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) throw Error('Missing Google OAuth Keys');
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) throw Error('Missing Github OAuth Keys');

  // -=- Setup SuperTokens -=-
  SuperTokens.init({
    framework: 'express',
    supertokens: {
      connectionURI: 'http://supertokens:3567',
    },
    appInfo: {
      apiDomain: 'http://127.0.0.1:8000',
      appName: 'Note Rack',
      websiteDomain: 'http://127.0.0.1:3000',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      ThirdParty.init({
        signInAndUpFeature: {
          providers: [
            Google({
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET,
            }),
            Github({
              clientId: GITHUB_CLIENT_ID,
              clientSecret: GITHUB_CLIENT_SECRET,
            }),
          ],
        },
        override: {
          functions: (originalImplementation) => ({
            ...originalImplementation,
            signInUp: async (input: any) => {
              // -=- Verify Original Implementation -=-
              if (originalImplementation.signInUp === undefined) throw Error('Should never come here');

              // -=- Run Original Implementation -=-
              const response = await originalImplementation.signInUp(input);

              // -=- Check Response Status -=-
              if (response.status !== 'OK') return response;

              // -=- Check Response Type -=-
              if (!response.createdNewUser) return response;

              const userID = response.user.id;

              // -=- Post Sign Up Code -=-

              // ~ Create the users homepage
              const homePage = await PageModel.create(
                {
                  user: userID,
                  style: {
                    colour: {
                      r: 147,
                      g: 197,
                      b: 253,
                    },
                    icon: '📝',
                    name: 'New Notebook',
                  },
                  data: [],
                },
              );

              // ~ Create the users page tree
              await PageTreeModel.create(
                {
                  _id: userID,
                  subPages: [
                    {
                      _id: homePage._id,
                      expanded: false,
                      style: {
                        colour: {
                          r: 147,
                          g: 197,
                          b: 253,
                        },
                        icon: '📝',
                        name: 'New Notebook',
                      },
                      subPages: [],
                    },
                  ],
                },
              );

              // ~ Create the map to the homepage
              await PageMapModel.create({
                _id: homePage._id,
                pathToPage: [],
              });

              // ~ Create a new user model on our DB with the same userID
              await UserModel.create({
                username: userID,
                homePage: homePage._id,
              });

              return response;
            },
          }),
        },
      }),
      Session.init(),
    ],
  });
};

export default setupAuth;
