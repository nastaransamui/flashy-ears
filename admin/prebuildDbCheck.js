var users = require('./jsonDump/users');
var roles = require('./jsonDump/roles');
var country = require('./jsonDump/country');
var province = require('./jsonDump/province');
var cities = require('./jsonDump/cities');
var currencies = require('./jsonDump/currencies');
var mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const { Parse } = require('unzipper');
const { createWriteStream, createReadStream } = require('fs');

const unzip = () => {
  const stream = createReadStream(
    `${(process.cwd(), 'jsonDump/geoLocations.zip')}`
  ).pipe(Parse());

  return new Promise((resolve, reject) => {
    stream.on('entry', (entry) => {
      const writeStream = createWriteStream(
        `${(process.cwd(), `jsonDump/${entry.path}`)}`
      );
      return entry.pipe(writeStream);
    });
    stream.on('finish', () => resolve());
    stream.on('error', (error) => reject(error));
  });
};
require('dotenv').config();
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

async function checkDbs() {
  const dbConnected = await dbConnect();
  const { success, error } = dbConnected;
  if (success) {
    unzip().then(async () => {
      let usersLength = await users.retrieveAll(DATABASE_PASSWORD);
      console.log(`usersLength: ${usersLength}`);
      let rolesLength = await roles.retrieveAll(DATABASE_PASSWORD);
      console.log(`rolesLength: ${rolesLength}`);
      let countryLength = await country.retrieveAll(DATABASE_PASSWORD);
      console.log(`countryLength: ${countryLength}`);
      let provinceLength = await province.retrieveAll(DATABASE_PASSWORD);
      console.log(`provinceLength: ${provinceLength}`);
      console.log(
        `Please wait for checking cities as it's almost 150k records ....`
      );
      let citiesLength = await cities.retrieveAll(DATABASE_PASSWORD);
      console.log(`citiesLength: ${citiesLength}`);
      let currenciesLength = await currencies.retrieveAll(DATABASE_PASSWORD);
      console.log(`currenciesLength: ${currenciesLength}`);
      const countriesDb = path.join(
        process.cwd(),
        'jsonDump',
        'countries.json'
      );
      const provincesDb = path.join(
        process.cwd(),
        'jsonDump',
        'provinces.json'
      );
      const citiesDb = path.join(process.cwd(), 'jsonDump', 'cities.json');
      fs.unlink(countriesDb, (eror) => {
        if (error) {
          console.log(error);
        } else {
          fs.unlink(provincesDb, (err) => {
            if (err) {
              console.log(err);
            } else {
              fs.unlink(citiesDb, (er) => {
                if (er) {
                  console.log(er);
                } else {
                  process.exit();
                }
              });
            }
          });
        }
      });
    });
  } else {
    console.log(error);
  }
}
checkDbs();
