import mongoose, { Types } from 'mongoose';
import ColorSchema, { IColors } from './Colors';
export interface ImageProductFrontType {
  [key: string]: string;
}
export interface ImageProductBackType {
  [key: string]: string;
}
export interface ImageProductType {
  front: ImageProductFrontType;
  back: ImageProductBackType;
}
export interface IProducts {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  product_name_en: string;
  product_name_th: string;
  product_label_en: string;
  product_label_th: string;
  product_subtitle_en: string;
  product_subtitle_th: string;
  product__description_en: string;
  product__description_th: string;
  product__price: string;
  images: ImageProductType[];
  colors: IColors[];
}

const ProductSchema = new mongoose.Schema<IProducts>(
  {
    product_name_en: { type: String, required: true },
    product_name_th: { type: String, required: true },
    product_label_en: { type: String, required: true },
    product_label_th: { type: String, required: true },
    product_subtitle_en: { type: String, required: true },
    product_subtitle_th: { type: String, required: true },
    product__description_en: { type: String, required: true },
    product__description_th: { type: String, required: true },
    product__price: { type: String, required: true },
    images: [
      {
        front: {},
      },
      {
        back: {},
      },
    ],
    colors: [],
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model<IProducts>('Products', ProductSchema);
export const dispalyFields = [
  'product_name_en',
  'product_name_th',
  'product_label_en',
  'product_label_th',
  'product_subtitle_en',
  'product_subtitle_th',
  'product__description_en',
  'product__description_th',
  'product__price',
];
const icon = {
  ...Object.fromEntries(
    dispalyFields.map((key) => {
      return [
        key,
        {
          icon:
            key == 'createdAt' || key == 'updatedAt'
              ? 'EventIcon'
              : key == 'product_name_en' || key == 'product_name_th'
              ? 'InfoIcon'
              : key == 'product_label_en' || key == 'product_label_th'
              ? 'FlagIcon'
              : 'TitleIcon',
        },
      ];
    })
  ),
};

export const muiDataObj = {
  ...Object.fromEntries(
    dispalyFields.map((key) => [
      key,
      {
        type: 'string',
        thumbnail: key !== 'product_name_en' ? '' : 'images',
        filterable: true,
        searchable: key == 'createdAt' || key == 'updatedAt' ? false : true,
        ...icon[key],
      },
    ])
  ),
};
