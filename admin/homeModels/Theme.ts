import mongoose, { Types } from 'mongoose';

export interface ITheme {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  name?: string;
  homePageType?: string;
}

const ThemeSchema = new mongoose.Schema<ITheme>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: 'oceanBlue',
  },
  homePageType: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: 'landingPage',
  },
});

export default mongoose.models.Theme ||
  mongoose.model<ITheme>('Theme', ThemeSchema);
