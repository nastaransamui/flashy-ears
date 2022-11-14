import mongoose, { Types } from 'mongoose';
export interface IVideo {
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
  imageMobileShowKey: string;
  videoPosterKey: string;
  videoLinkKey: string;
  youTubeId: string;
  finalFolder: string;
  folderId: string;
  isActive: boolean;
  isYoutube: boolean;
  isVercel: boolean;
  imageMobileShow: string;
  videoPoster: string;
  videoLink: string;
}

const VideoSchema = new mongoose.Schema<IVideo>(
  {
    title_en: { type: String, required: true },
    title_fa: { type: String, required: true },
    topTitle_en: { type: String, required: true },
    topTitle_fa: { type: String, required: true },
    subTitle_en: { type: String, required: true },
    subTitle_fa: { type: String, required: true },
    button_en: { type: String, required: true },
    button_fa: { type: String, required: true },
    imageMobileShowKey: { type: String, required: true },
    videoPosterKey: { type: String, required: true },
    videoLinkKey: { type: String, required: true },
    youTubeId: { type: String },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    isActive: { type: Boolean, required: true, index: true },
    isYoutube: { type: Boolean, required: true },
    isVercel: { type: Boolean, required: true },
    imageMobileShow: { type: String, required: true },
    videoPoster: { type: String, required: true },
    videoLink: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Videos ||
  mongoose.model<IVideo>('Videos', VideoSchema);

export const dispalyFields = [
  'title_en',
  'isActive',
  'isYoutube',
  'title_fa',
  'createdAt',
  'updatedAt',
  'topTitle_en',
  'topTitle_fa',
  'subTitle_en',
  'subTitle_fa',
  'button_en',
  'button_fa',
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
          key == 'isYoutube' ||
          key == 'createdAt' ||
          key == 'updatedAt'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
