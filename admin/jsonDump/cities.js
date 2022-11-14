var mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const CitiesSchema = new mongoose.Schema(
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
);
var Cities = mongoose.models.Cities || mongoose.model('Cities', CitiesSchema);

const citiesDb = path.join(process.cwd(), 'jsonDump', 'cities.json');

const checkCities = {
  retrieveAll: function (DATABASE_PASSWORD) {
    return new Promise(async (resolve, reject) => {
      let length = await mongoose.connection.db
        .collection('cities')
        .estimatedDocumentCount();
      if (length !== 0) {
        resolve(length);
      } else {
        var addCityCommand = `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
          process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
        } --collection cities --type json --file ${citiesDb}`;
        var child = require('child_process').exec(addCityCommand);
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        child.stdout.pipe(process.stdout);
        child.on('exit', async () => {
          resolve(
            await mongoose.connection.db
              .collection('cities')
              .estimatedDocumentCount()
          );
        });
      }
    });
  },
};

module.exports = checkCities;
