import mongoose, { Types } from 'mongoose';

export interface PhoneAgentType {
  tags: string[];
  number: string;
  remark: string;
}

export interface IAgent {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  agentId: string;
  agentName: string;
  isActive: boolean;
  address: string;
  logoImage: string;
  logoImageKey: string;
  finalFolder: string;
  folderId: string;
  city_id: Types.Array<Types.ObjectId>;
  cityName: string;
  province_id: Types.Array<Types.ObjectId>;
  provinceName: string;
  country_id: Types.Array<Types.ObjectId>;
  countryName: string;
  phones: PhoneAgentType[];
  email: string;
  currencyCode_id: Types.Array<Types.ObjectId>;
  currencyCode: string;
  creditAmount: number;
  depositAmount: number;
  remainCreditAmount: number;
  remainDepositAmount: number;
  userCreated: Types.Array<Types.ObjectId>;
  userUpdated: Types.Array<Types.ObjectId>;
  accountManager_id: Types.Array<Types.ObjectId>;
  accountManager: string;
  isVercel: boolean;
  remark: string;
}

const AgenciesSchema = new mongoose.Schema<IAgent>(
  {
    agentId: { type: String, required: true, unique: true, index: true },
    agentName: { type: String, required: true, unique: true, index: true },
    isActive: { type: Boolean, default: true },
    address: { type: String },
    logoImage: { type: String, default: '' },
    logoImageKey: { type: String, default: '' },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    city_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    cityName: { type: String, required: true },
    province_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    provinceName: { type: String, required: true },
    country_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    countryName: { type: String, required: true },
    phones: [
      {
        tags: ['string'],
        number: 'string',
        remark: 'string',
      },
    ],
    email: { type: String, required: true, unique: true, index: true },
    currencyCode_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Currencies' },
    ],
    currencyCode: { type: String, required: true },
    creditAmount: { type: Number, required: true, default: 0 },
    depositAmount: { type: Number, required: true, default: 0 },
    remainCreditAmount: { type: Number, required: true, default: 0 },
    remainDepositAmount: { type: Number, required: true, default: 0 },
    userCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    userUpdated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    accountManager_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    accountManager: { type: String },
    isVercel: { type: Boolean },
    remark: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Agencies ||
  mongoose.model<IAgent>('Agencies', AgenciesSchema);

export const dispalyFields = [
  'agentId',
  'agentName',
  'isActive',
  'address',
  'cityName',
  'provinceName',
  'countryName',
  'phones',
  'email',
  'currencyCode',
  'creditAmount',
  'depositAmount',
  'remainCreditAmount',
  'remainDepositAmount',
  'accountManager',
  'createdAt',
  'updatedAt',
  'remark',
];

const icon = {
  ...Object.fromEntries(
    dispalyFields.map((key) => {
      return [
        key,
        {
          icon:
            key == 'agentId'
              ? 'Grid3x3Icon'
              : key == 'agentName'
              ? 'HomeWork'
              : key == 'address'
              ? 'HomeIcon'
              : key == 'cityName' || key == 'provinceName'
              ? 'LocationCityIcon'
              : key == 'countryName'
              ? 'FlagIcon'
              : key == 'phones'
              ? 'LocalPhoneIcon'
              : key == 'email'
              ? 'AlternateEmailIcon'
              : key == 'currencyCode'
              ? 'AttachMoneyIcon'
              : key == 'createdAt' || key == 'updatedAt'
              ? 'EventIcon'
              : key == 'creditAmount' ||
                key == 'depositAmount' ||
                'remainCreditAmount' ||
                'remainDepositAmount' ||
                'remark'
              ? 'InfoIcon'
              : key == 'isActive'
              ? 'People'
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
        type:
          key == 'isActive'
            ? 'boolean'
            : key == 'creditAmount' ||
              key == 'depositAmount' ||
              key == 'remainCreditAmount' ||
              key == 'remainDepositAmount'
            ? 'number'
            : 'string',
        thumbnail: key !== 'agentName' ? '' : 'logoImage',
        width:
          key == 'agentName' ||
          key == 'remark' ||
          key == 'address' ||
          key == 'email' ||
          key == 'remainCreditAmount' ||
          key == 'remainDepositAmount' ||
          key == 'accountManager' ||
          key == 'createdAt' ||
          key == 'updatedAt'
            ? undefined
            : 150,
        align:
          key == 'agentName' ||
          key == 'email' ||
          key == 'remark' ||
          key == 'address' ||
          key == 'accountManager'
            ? undefined
            : 'center',
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
