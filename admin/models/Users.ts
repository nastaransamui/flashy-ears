import mongoose, { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  userName: string;
  password: string;
  profileImage: string;
  profileImageKey: string;
  finalFolder: string;
  folderId: string;
  firstName: string;
  lastName: string;
  cityName: string;
  role_id: Types.Array<Types.ObjectId>;
  roleName: string;
  city_id: Types.Array<Types.ObjectId>;
  province_id: Types.Array<Types.ObjectId>;
  country_id: Types.Array<Types.ObjectId>;
  agents_id: Types.Array<Types.ObjectId>;
  provinceName: string;
  countryName: string;
  position: string;
  aboutMe: string;
  isAdmin: boolean;
  isVercel: boolean;
  accessToken: string;
  twitter: Types.Array<String>;
  facebook: Types.Array<String>;
  google: Types.Array<String>;
}
const UsersSchema = new mongoose.Schema<IUser>(
  {
    userName: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: '' },
    profileImageKey: { type: String, default: '' },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    cityName: { type: String },
    role_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true },
    ],
    roleName: { type: String, required: true },
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    city_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    province_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    provinceName: { type: String },
    country_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    countryName: { type: String },
    position: { type: String },
    aboutMe: { type: String },
    isAdmin: { type: Boolean, default: false },
    isVercel: { type: Boolean },
    accessToken: { type: String, default: '' },
    twitter: [
      {
        twitterId: String,
        twitterUserName: String,
        twitterdipslayName: String,
        twitterProfile: String,
        twitterlocation: String,
        twitterBanner: String,
      },
    ],
    facebook: [],
    google: [],
  },
  { timestamps: true }
);

export default mongoose.models.Users ||
  mongoose.model<IUser>('Users', UsersSchema);