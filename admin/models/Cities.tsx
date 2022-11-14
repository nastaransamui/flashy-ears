import mongoose, { Types } from 'mongoose';

export interface ICity {
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
  state_id: number;
  state_name: string;
  iso2: string;
  isHotelsActive: boolean;
  latitude: string;
  longitude: string;
  users_id: Types.Array<Types.ObjectId>;
  agents_id: Types.Array<Types.ObjectId>;
  hotels_id: Types.Array<Types.ObjectId>;
  suppliers_id: Types.Array<Types.ObjectId>;
}

const CitiesSchema = new mongoose.Schema<ICity>(
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
    country_name: { type: String, required: true, index: true },
    state_id: { type: Number, required: true, index: true },
    state_name: { type: String, required: true },
    iso2: { type: String, required: true, index: true },
    isHotelsActive: { type: Boolean, default: false, index: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    hotels_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }],
    suppliers_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suppliers' }],
  },
  { timestamps: true }
)

export default mongoose.models.Cities ||
  mongoose.model<ICity>('Cities', CitiesSchema);

export const dispalyFields = [
  'name',
  'isActive',
  'country_name',
  'iso2',
  'state_name',
  'totalAgents',
  'isHotelsActive',
  'latitude',
  'longitude',
  'totalUsers',
  'totalAgents',
  'totalActiveHotels',
  'totalSuppliers',
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
                      : key == 'name' ||
                        key == 'iso2' ||
                        key == 'country_name' ||
                        key == 'state_name'
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
              key == 'totalHotels'
              ? 'number'
              : 'string',
        thumbnail: key !== 'name' ? '' : 'iso2',
        width:
          key == 'name' ||
            key == 'country_name' ||
            key == 'state_name' ||
            key == 'totalSuppliers'
            ? undefined
            : 150,
        align: key == 'name' || key == 'country_name' ? undefined : 'center',
        filterable:
          key == 'name' || key == 'country_name' || key == 'state_name'
            ? true
            : false,
        searchable:
          key == 'isActive' ||
            key == 'isHotelsActive' ||
            key == 'totalUsers' ||
            key == 'totalAgents' ||
            key == 'totalActiveHotels' ||
            key == 'totalSuppliers' ||
            key == 'latitude' ||
            key == 'longitude' ||
            key == 'createdAt' ||
            key == 'updatedAt'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};