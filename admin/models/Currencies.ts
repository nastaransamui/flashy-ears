import mongoose, { Types } from 'mongoose';

export interface ICurrency {
  _id: Types.ObjectId;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  name: string;
  isActive: boolean;
  iso3: string;
  iso2: string;
  agents_id: Types.Array<Types.ObjectId>;
  suppliers_id: Types.Array<Types.ObjectId>;
  numeric_code: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  emoji: string;
}

const CurrenciesSchema = new mongoose.Schema<ICurrency>(
  {
    id: { type: Number, required: true, index: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false, index: true },
    iso3: { type: String, required: true },
    iso2: { type: String, required: true },
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    suppliers_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suppliers' }],
    numeric_code: { type: String, required: true },
    currency: { type: String, required: true },
    currency_name: { type: String, required: true },
    currency_symbol: { type: String, required: true },
    emoji: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Currencies ||
  mongoose.model<ICurrency>('Currencies', CurrenciesSchema);

export const dispalyFields = [
  'name',
  'isActive',
  'iso3',
  'iso2',
  'totalAgents',
  'totalSuppliers',
  'numeric_code',
  'currency',
  'currency_name',
  'currency_symbol',
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
              : key == 'currency' ||
                key == 'currency_name' ||
                key == 'currency_name'
              ? 'CurrencyExchangeIcon'
              : key == 'totalAgents' || 'totalSuppliers'
              ? 'AccountBoxIcon'
              : key == 'name' ||
                key == 'iso3' ||
                key == 'iso2' ||
                key == 'numeric_code'
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
          key == 'isActive'
            ? 'boolean'
            : key == 'totalSuppliers' || key == 'totalAgents'
            ? 'number'
            : 'string',
        thumbnail: key !== 'name' ? '' : 'iso2',
        width:
          key == 'name' || key == 'currency_name' || key == 'totalSuppliers'
            ? undefined
            : 150,
        align: key == 'name' || key == 'currency_name' ? undefined : 'center',
        filterable: true,
        searchable:
          key == 'isActive' ||
          key == 'createdAt' ||
          key == 'updatedAt' ||
          key == 'totalAgents' ||
          key == 'totalSuppliers' ||
          key == 'currency_symbol'
            ? false
            : true,
        ...icon[key],
      },
    ])
  ),
};
