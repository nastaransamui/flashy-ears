var mongoose = require('mongoose');
require('dotenv').config();
var toBoolean = require('to-boolean');
const fs = require('fs');
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
    isCountryActive: { type: Boolean, default: false },
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

const { DATABASE_URL_UAT, DATABASE_URL_LIVE, DATABASE_PASSWORD } = process.env;

if (process.env.NODE_ENV == 'development') {
  if (!DATABASE_URL_UAT) {
    new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }
} else {
  if (!DATABASE_URL_LIVE) {
    new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, success: false };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      return cached;
    }
    if (!cached.promise) {
      const connectionUrl =
        process.env.NODE_ENV == 'development'
          ? DATABASE_URL_UAT
          : DATABASE_URL_LIVE;
      cached.promise = mongoose.connect(connectionUrl).then(() => {
        const database = mongoose.connection;
        database.on('error', (err) => {
          cached.success = false;
        });
        database.once('open', () => {
          cached.success = true;
          console.log('Connected to database...');
        });
        return database;
      });
    }
    cached.conn = await cached.promise;
    cached.success = true;
    return cached;
  } catch (error) {
    return { success: false, error: error?.toString() };
  }
}

async function createCountriesIsEmpty() {
  try {
    const dbConnected = await dbConnect();
    const { success, error } = dbConnected;
    if (success) {
      let countriesCollectionIsEmpty = await Countries.find();
      console.log(
        `countriesCollectionIsEmpty: ${countriesCollectionIsEmpty.length}`
      );
      if (countriesCollectionIsEmpty.length == 0) {
        let exec = require('child_process').exec;
        const countries = path.join(
          process.cwd(),
          'public/geolocationsData',
          'countries_db.json'
        );
        let command = `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/UAT --collection countries --type json --file ${countries}`;
        exec(command, (err, stdout, stderr) => {
          // check for errors or if it was succesfuly
          console.log(`err: ${err}`);
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          process.exit();
        });

        // let rawdata = fs.readFileSync(countries);
        // let data = JSON.parse(rawdata);
        // Countries.insertMany(data, async (err, data) => {
        //   if (err) {
        //     console.log(`err: ${err.toString()}`);
        //     process.exit();
        //   }
        //   console.log(`${data.length} countries was added to countries`);
        //   process.exit();
        // });
      } else {
        process.exit();
      }
    } else {
      process.exit();
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

createCountriesIsEmpty();
