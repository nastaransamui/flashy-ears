import mongoose, { Types } from 'mongoose';

export interface IPhoto {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  title_en: string;
  title_fa: string;
  topTitle_en: string;
  topTitle_fa: string;
  subTitle_en: string;
  subTitle_fa: string;
  button_en: string;
  button_fa: string;
  finalFolder: string;
  folderId: string;
  isActive: boolean;
  isVercel: boolean;
  imageShow: string;
  imageShowKey: string;
}

const PhotosSchema = new mongoose.Schema<IPhoto>(
  {
    title_en: { type: String, required: true },
    title_fa: { type: String, required: true },
    topTitle_en: { type: String, required: true },
    topTitle_fa: { type: String, required: true },
    subTitle_en: { type: String, required: true },
    subTitle_fa: { type: String, required: true },
    button_en: { type: String, required: true },
    button_fa: { type: String, required: true },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    isActive: { type: Boolean, required: true, index: true },
    isVercel: { type: Boolean, required: true },
    imageShow: { type: String, required: true },
    imageShowKey: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Photos ||
  mongoose.model<IPhoto>('Photos', PhotosSchema);

export const dispalyFields = [
  'title_en',
  'isActive',
  'title_fa',
  'topTitle_en',
  'topTitle_fa',
  'subTitle_en',
  'subTitle_fa',
  'button_en',
  'button_fa',
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
            key == 'isActive'
              ? 'CheckBoxIcon'
              : key == 'createdAt' || key == 'updatedAt'
              ? 'EventIcon'
              : key == 'title_en' || key == 'title_fa'
              ? 'InfoIcon'
              : key == 'button_en' || key == 'button_fa'
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
        type: key == 'isActive' ? 'boolean' : 'string',
        thumbnail: key !== 'title_en' ? '' : 'imageShow',
        filterable: true,
        searchable:
          key == 'isActive' || key == 'createdAt' || key == 'updatedAt'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
