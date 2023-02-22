import mongoose, { Types } from 'mongoose';
export interface ICollection {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  title_en: string;
  title_th: string;
  img_light: string;
  img_dark: string;
  desc_en: string;
  desc_th: string;
  linkTitle_en: string;
  linkTitle_th: string;
  link: string;
}

const CollectionSchema = new mongoose.Schema<ICollection>(
  {
    title_en: { type: String, required: true },
    title_th: { type: String, required: true },
    img_light: { type: String, required: true },
    img_dark: { type: String, required: true },
    desc_en: { type: String, required: true },
    desc_th: { type: String, required: true },
    linkTitle_en: { type: String, required: true },
    linkTitle_th: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Collections ||
  mongoose.model<ICollection>('Collections', CollectionSchema);
