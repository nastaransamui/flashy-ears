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
    isActive: { type: Boolean, required: true },
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
