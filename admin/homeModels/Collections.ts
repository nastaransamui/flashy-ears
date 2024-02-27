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
  label_en: string;
  label_th: string;
  name_en: string;
  name_th: string;
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
    label_en: { type: String, required: true },
    label_th: { type: String, required: true },
    name_en: { type: String, required: true, unique: true },
    name_th: { type: String, required: true },
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
export const dispalyFields = [
  'label_en',
  'label_th',
  'name_en',
  'name_th',
  'desc_en',
  'desc_th',
  'createdAt',
  'updatedAt',
  'linkTitle_en',
  'linkTitle_th',
  'totalProducts',
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
              : key == 'label_en' || key == 'label_th'
              ? 'InfoIcon'
              : key == 'linkTitle_en' || key == 'linkTitle_th'
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
        type: key == 'totalProducts' ? 'number' : 'string',
        thumbnail: key !== 'label_en' ? '' : 'img_light|img_dark',
        filterable: true,
        searchable:
          key == 'createdAt' || key == 'updatedAt' || key == 'totalProducts'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
