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
    isActive: { type: Boolean, default: false },
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
