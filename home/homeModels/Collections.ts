import mongoose, { ObjectId, Types } from 'mongoose';

export interface ImageCollectionType {
  height: number;
  width: number;
  src: string;
  isSelected: boolean;
  tags: [
    {
      [key: string]: string;
    }
  ];
  path: string;
}
export interface ICollection {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  title_en: string;
  title_th: string;
  img_light: ImageCollectionType;
  img_dark: ImageCollectionType;
  desc_en: string;
  desc_th: string;
  linkTitle_en: string;
  linkTitle_th: string;
  products_id: Types.Array<Types.ObjectId>;
}

const CollectionSchema = new mongoose.Schema<ICollection>(
  {
    title_en: { type: String, required: true, unique: true },
    title_th: { type: String, required: true },
    img_light: { type: Object, required: true },
    img_dark: { type: Object, required: true },
    desc_en: { type: String, required: true },
    desc_th: { type: String, required: true },
    linkTitle_en: { type: String, required: true },
    linkTitle_th: { type: String, required: true },
    products_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  },
  { timestamps: true }
);

export default mongoose.models.Collections ||
  mongoose.model<ICollection>('Collections', CollectionSchema);
