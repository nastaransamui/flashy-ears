import mongoose, { Types } from 'mongoose';
import { ICollection } from './Collections';
import ColorSchema, { IColors } from './Colors';
import { ImageCollectionType } from './Collections';

export interface FinancialType {
  color: Types.ObjectId;
  buyPrice: number;
  salePrice: number;
  totalInventory: number;
  totalInventoryInCart: number;
}
export interface IProducts {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  product_label_en: string;
  product_label_th: string;
  product_name_en: string;
  product_name_th: string;
  product_subtitle_en: string;
  product_subtitle_th: string;
  product_description_en: string;
  product_description_th: string;
  images: [
    {
      front: [];
    },
    {
      back: [];
    }
  ];
  colors_id: Types.Array<Types.ObjectId>;
  collection_id: Types.Array<Types.ObjectId>;
  gallery: ImageCollectionType[];
  financials: FinancialType[];
}

const ProductSchema = new mongoose.Schema<IProducts>(
  {
    product_label_en: { type: String, required: true },
    product_label_th: { type: String, required: true },
    product_name_en: { type: String, required: true },
    product_name_th: { type: String, required: true },
    product_subtitle_en: { type: String, required: true },
    product_subtitle_th: { type: String, required: true },
    product_description_en: { type: String, required: true },
    product_description_th: { type: String, required: true },
    colors_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Colors' }],
    collection_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Collections' },
    ],
    financials: [],
    images: [],
    gallery: [],
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model<IProducts>('Products', ProductSchema);
export const dispalyFields = [
  'product_label_en',
  'product_label_th',
  'product_name_en',
  'product_name_th',
  'product_subtitle_en',
  'product_subtitle_th',
  'product_description_en',
  'product_description_th',
  'colors',
  'collectionData',
  'financials',
  'gallery',
  'createdAt',
  'updatedAt',
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
              ? 'InventoryIcon'
              : key == 'financials'
              ? 'AttachMoneyIcon'
              : key == 'colors'
              ? 'ColorLensIcon'
              : key == 'gallery'
              ? 'ImageIcon'
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
        align: 'left',
        thumbnail: key !== 'product_label_en' ? '' : 'gallery',
        filterable:
          key == 'colors' ||
          key == 'gallery' ||
          key == 'collectionData' ||
          key == 'financials'
            ? false
            : true,
        searchable:
          key == 'gallery' ||
          key == 'financials' ||
          key == 'createdAt' ||
          key == 'updatedAt' ||
          key == 'colors_id' ||
          key == 'colors' ||
          key == 'collectionData'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
