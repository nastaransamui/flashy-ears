import mongoose, { Types } from 'mongoose';

export interface ITheme {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  name?: string;
}

const ThemeSchema = new mongoose.Schema<ITheme>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: 'oceanBlue',
  },
});

export default mongoose.models.Theme ||
  mongoose.model<ITheme>('Theme', ThemeSchema);
