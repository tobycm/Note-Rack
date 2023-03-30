import mongoose, { Schema, Document } from 'mongoose';

interface Block {
  blockType: string;
  properties: {};
  children: Block[];
}

export interface IPage extends Document {
  user: string;
  permissions: {
    [key: string]: {
      read: boolean;
      write: boolean;
      admin: boolean;
      email: string;
    };
  };
  style: {};
  data: Block[];
}

const PageSchema = new Schema<IPage>({
  user: String,
  permissions: {},
  style: {},
  data: [
    {
      blockType: String,
      properties: {},
      children: [],
    },
  ],
});

const PageModel = mongoose.models.page as mongoose.Model<IPage> || mongoose.model('page', PageSchema);

export default PageModel;
