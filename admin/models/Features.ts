import mongoose, { Types } from 'mongoose';

export interface IFeature {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  title_en: string;
  title_fa: string;
  imageShow: string;
  imageShowKey: string;
  videoLink: string;
  videoLinkKey: string;
  youTubeId: string;
  finalFolder: string;
  folderId: string;
  isActive: boolean;
  isYoutube: boolean;
  isVercel: boolean;
}

const FeaturesSchema = new mongoose.Schema<IFeature>(
  {
    title_en: { type: String, required: true },
    title_fa: { type: String, required: true },
    imageShow: { type: String, required: true },
    imageShowKey: { type: String, required: true },
    videoLink: { type: String, required: true },
    videoLinkKey: { type: String, required: true },
    youTubeId: { type: String },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    isActive: { type: Boolean, required: true, index: true },
    isYoutube: { type: Boolean, required: true },
    isVercel: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Features ||
  mongoose.model<IFeature>('Features', FeaturesSchema);

export const dispalyFields = [
  'title_en',
  'title_fa',
  'isActive',
  'isYoutube',
  'createdAt',
  'updatedAt',
  'youTubeId',
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
              : key == 'isYoutube'
              ? 'CheckBoxOutlineBlank'
              : key == 'createdAt' || key == 'updatedAt'
              ? 'EventIcon'
              : key == 'title_en' || key == 'title_fa'
              ? 'InfoIcon'
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
        type: key == 'isActive' || key == 'isYoutube' ? 'boolean' : 'string',
        thumbnail:
          key == 'youTubeId'
            ? 'youTubeId'
            : key !== 'title_en'
            ? ''
            : 'videoLink',
        filterable: true,
        searchable:
          key == 'isActive' ||
          key == 'createdAt' ||
          key == 'updatedAt' ||
          key == 'isYoutube'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
