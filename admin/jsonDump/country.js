var mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');

const CountriesSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    hotels_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }],
    states_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'States' }],
    cities_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cities' }],
    isHotelsActive: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    name: { type: String, required: true, unique: true, index: true },
    iso3: { type: String, required: true, unique: true, index: true },
    iso2: { type: String, required: true, unique: true, index: true },
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
var Countries =
  mongoose.models.Countries || mongoose.model('Countries', CountriesSchema);

exports.checkCountry = async function (DATABASE_PASSWORD, exec) {
  try {
    let countries = await Countries.find();
    let countriesLength = countries.length;
    console.log(`countriesLength: ${countriesLength}`);
    if (countriesLength == 0) {
      const countriesDb = path.join(
        process.cwd(),
        'jsonDump',
        'countries.json'
      );
      let exec = require('child_process').exec;
      var addCountryCommand = `/usr/bin/mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
        process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
      } --collection countries --type json --file ${countriesDb}`;
      exec(addCountryCommand, (err, stdout, stderr) => {
        // check for errors or if it was succesfuly
        console.log(`err: ${err}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
