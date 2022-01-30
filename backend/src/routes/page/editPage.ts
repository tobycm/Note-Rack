import express, { Request, Response } from 'express';
import crypto from 'crypto';

import PageModel from '../../models/pageModel';

const router = express.Router();

interface deleteActionData {
  blockID: string,
}

interface addActionData {
  blockType: string,
  index: number,
}

interface editActionData {
  blockID: string,
  data: {
    blockType: String | undefined,
    properties: any | undefined,
    style: any | undefined,
  }
}

router.patch(
  '/update-page/:page',
  async (req: Request, res: Response) => {
    const { page } = req.params;
    const { username } = res.locals;
    const { action, actionData } = req.body;

    if (!(action && actionData)) {
      res.statusCode = 400;
      res.json({
        status: 'error',
        message: 'Insufficient parameters supplied to edit a page!',
      });
      return;
    }

    if (!username) {
      res.statusCode = 401;
      res.json({
        status: 'error',
        message: 'Please login to view this page!',
      });
      return;
    }

    const pageData = await PageModel.findById(page, 'user').lean();

    if (!pageData) {
      res.statusCode = 404;
      res.json({
        status: 'error',
        message: 'Page not found please try another page...',
      });
      return;
    }

    if (pageData.user !== username) {
      res.statusCode = 403;
      res.json({
        status: 'error',
        message: 'You do not have access to this file please login with a different account to view it...',
      });
      return;
    }

    switch (action) {
      case 'delete': {
        const typedActionData = actionData as deleteActionData;

        PageModel.findOneAndUpdate(
          {
            _id: page,
          },
          {
            $pull: {
              'data.$.blockID': typedActionData.blockID,
            },
          },
        );

        res.statusCode = 200;
        res.json({
          status: 'success',
          message: 'Succesfully deleted element',
        });
        break;
      }

      case 'add': {
        const typedActionData = actionData as addActionData;
        const newBlockID = crypto.randomBytes(20).toString('hex');
        PageModel.findOneAndUpdate(
          {
            _id: page,
          },
          {
            $push: {
              data: {
                $each: [{
                  blockType: typedActionData.blockType,
                  blockID: newBlockID,
                  properties: {},
                  style: {},
                }],
                $position: typedActionData.index,
              },
            },
          },
        );

        res.statusCode = 200;
        res.json({
          status: 'success',
          message: {
            statusMessage: 'Succesfully added element',
            blockID: newBlockID,
          },
        });
        break;
      }

      case 'edit': {
        const typedActionData = actionData as editActionData;
        await PageModel.updateOne(
          {
            _id: page,
          },
          {
            $set: {
              ...(typedActionData.data.blockType !== undefined && { 'data.$[block].blockType': typedActionData.data.blockType }),
              ...(typedActionData.data.properties !== undefined && { 'data.$[block].properties': typedActionData.data.properties }),
              ...(typedActionData.data.style !== undefined && { 'data.$[block].style': typedActionData.data.style }),
            },
          },
          {
            arrayFilters: [
              {
                'block.blockID': typedActionData.blockID,
              },
            ],
          },
        );

        res.statusCode = 200;
        res.json({
          status: 'success',
          message: 'Succesfully edited element',
        });
        break;
      }

      default:
        res.statusCode = 400;
        res.json({
          status: 'error',
          message: 'Invalid operation',
        });
        break;
    }
  },
);

export default router;
