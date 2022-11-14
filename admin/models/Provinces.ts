import mongoose, { Types } from 'mongoose';

export interface IProvince {
  _id: Types.ObjectId;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  name: string;
  isActive: boolean;
  country_id: number;
  country_name: string;
  iso2: string;
  isHotelsActive: boolean;
  state_code: string;
  type: string | null;
  latitude: string;
  longitude: string;
  cities_id: Types.Array<Types.ObjectId>;
  users_id: Types.Array<Types.ObjectId>;
  agents_id: Types.Array<Types.ObjectId>;
  hotels_id: Types.Array<Types.ObjectId>;
  suppliers_id: Types.Array<Types.ObjectId>;
}

const ProvincesSchema = new mongoose.Schema<IProvince>(
  {
    id: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    name: { type: String, required: true, index: true },
    isActive: { type: Boolean, default: false, index: true },
    country_id: { type: Number, required: true, index: true },
    country_name: { type: String, required: true },
    iso2: { type: String, required: true },
    isHotelsActive: { type: Boolean, default: false },
    state_code: { type: String, required: true },
    type: { type: String, required: true, default: null },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    cities_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cities' }],
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    hotels_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }],
    suppliers_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suppliers' }],
  },
  { timestamps: true }
);

export default mongoose.models.Provinces ||
  mongoose.model<IProvince>('Provinces', ProvincesSchema);

export const dispalyFields = [
  'name',
  'isActive',
  'isHotelsActive',
  'country_name',
  'type',
  'iso2',
  'totalCities',
  'totalUsers',
  'totalAgents',
  'totalActiveHotels',
  'totalSuppliers',
  'latitude',
  'longitude',
];
const icon = {
  ...Object.fromEntries(
    dispalyFields.map((key) => {
      return [
        key,
        {
          icon:
            key == 'isActive' || key == 'isHotelsActive'
              ? 'CheckBoxIcon'
              : key == 'totalActiveHotels'
              ? 'HotelIcon'
              : key == 'totalUsers'
              ? 'BadgeIcon'
              : key == 'totalAgents' || key == 'totalSuppliers'
              ? 'AccountBoxIcon'
              : key == 'latitude' || key == 'longitude'
              ? 'FmdGoodIcon'
              : key == 'name' || key == 'iso2' || key == 'country_name'
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
        type:
          key == 'isHotelsActive' || key == 'isActive'
            ? 'boolean'
            : key == 'totalUsers' ||
              key == 'totalAgents' ||
              key == 'totalSuppliers' ||
              key == 'totalHotels' ||
              key == 'totalCities'
            ? 'number'
            : 'string',
        thumbnail: key !== 'name' ? '' : 'iso2',
        width:
          key == 'name' ||
          key == 'country_name' ||
          key == 'type' ||
          key == 'totalSuppliers'
            ? undefined
            : 150,
        align: key == 'name' || key == 'country_name' ? undefined : 'center',
        filterable: true,
        searchable:
          key == 'isActive' ||
          key == 'isHotelsActive' ||
          key == 'totalCities' ||
          key == 'totalUsers' ||
          key == 'totalAgents' ||
          key == 'totalActiveHotels' ||
          key == 'totalSuppliers' ||
          key == 'latitude' ||
          key == 'longitude' ||
          key == 'type' ||
          key == 'createdAt' ||
          key == 'updatedAt'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
