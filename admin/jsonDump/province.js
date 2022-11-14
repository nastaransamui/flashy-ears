var mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');
const fs = require('fs');

const ProvincesSchema = new mongoose.Schema(
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
var Provinces =
  mongoose.models.Provinces || mongoose.model('Provinces', ProvincesSchema);

const provincesDb = path.join(process.cwd(), 'jsonDump', 'provinces.json');

const checkProvinces = {
  retrieveAll: function (DATABASE_PASSWORD) {
    return new Promise(async (resolve, reject) => {
      let length = await mongoose.connection.db
        .collection('provinces')
        .estimatedDocumentCount();
      if (length !== 0) {
        resolve(length);
      } else {
        var addProvinceCommand = `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
          process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
        } --collection provinces --type json --file ${provincesDb}`;
        var child = require('child_process').exec(addProvinceCommand);
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        child.stdout.pipe(process.stdout);
        child.on('exit', async () => {
          resolve(
            await mongoose.connection.db
              .collection('provinces')
              .estimatedDocumentCount()
          );
        });
      }
    });
  },
};

module.exports = checkProvinces;
