import mongoose, { ObjectId, Types } from 'mongoose';
export interface IColors {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  label_en: string;
  label_th: string;
  name_en: string;
  name_th: string;
  colorCode: string;
  products_id: Types.Array<Types.ObjectId>;
}

export const ColorSchema = new mongoose.Schema<IColors>(
  {
    label_en: { type: String, required: true },
    label_th: { type: String, required: true },
    name_en: { type: String, required: true, unique: true },
    name_th: { type: String, required: true, unique: true },
    colorCode: { type: String, required: true },
    products_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  },
  { timestamps: true }
);

export default mongoose.models.Colors ||
  mongoose.model<IColors>('Colors', ColorSchema);
