import mongoose, { Types } from 'mongoose';

export interface TimeZonesCountry {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface TranslationsCountry {
  kr: string;
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  cn: string;
  th: string;
}

export interface ICountry {
  _id: Types.ObjectId;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save?: any;
  users_id: Types.Array<Types.ObjectId>;
  agents_id: Types.Array<Types.ObjectId>;
  hotels_id: Types.Array<Types.ObjectId>;
  states_id: Types.Array<number>;
  cities_id: Types.Array<number>;
  isHotelsActive: boolean;
  isActive: boolean;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  timezones: TimeZonesCountry[];
  translations: TranslationsCountry;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

const CountriesSchema = new mongoose.Schema<ICountry>(
  {
    id: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    name: { type: String, required: true, unique: true, index: true },
    isActive: { type: Boolean, default: false },
    iso3: { type: String, required: true, unique: true, index: true },
    iso2: { type: String, required: true, unique: true, index: true },
    isHotelsActive: { type: Boolean, default: false },
    numeric_code: { type: String, required: true },
    phone_code: { type: String, required: true },
    capital: { type: String, required: false, default: '' },
    currency: { type: String, required: true },
    currency_name: { type: String, required: true },
    currency_symbol: { type: String, required: true },
    tld: { type: String, required: true },
    native: { type: String, required: true },
    region: { type: String, required: false, default: '' },
    subregion: { type: String, required: false, default: '' },
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    hotels_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }],
    states_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'States' }],
    cities_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cities' }],
    timezones: [
      {
        zoneName: String,
        gmtOffset: Number,
        gmtOffsetName: String,
        abbreviation: String,
        tzName: String,
      },
    ],
    translations: {
      kr: String,
      br: String,
      pt: String,
      nl: String,
      hr: String,
      fa: String,
      de: String,
      es: String,
      fr: String,
      ja: String,
      it: String,
      cn: String,
      th: String,
    },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    emoji: { type: String, required: true },
    emojiU: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Countries ||
  mongoose.model<ICountry>('Countries', CountriesSchema);
