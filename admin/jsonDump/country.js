var mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');
const fs = require('fs');

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

const countriesDb = path.join(process.cwd(), 'jsonDump', 'countries.json');

const checkCountries = {
  retrieveAll: function (DATABASE_PASSWORD) {
    return new Promise(async (resolve, reject) => {
      let length = await mongoose.connection.db
        .collection('countries')
        .estimatedDocumentCount();
      if (length !== 0) {
        resolve(length);
      } else {
        var addCountryCommand = `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
          process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
        } --collection countries --type json --file ${countriesDb}`;
        var child = require('child_process').exec(addCountryCommand);
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        child.stdout.pipe(process.stdout);
        child.on('exit', async () => {
          resolve(
            await mongoose.connection.db
              .collection('countries')
              .estimatedDocumentCount()
          );
        });
      }
    });
  },
};

module.exports = checkCountries;
