var mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');
const CurrenciesSchema = new mongoose.Schema(
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

var Currencies =
  mongoose.models.Currencies || mongoose.model('Currencies', CurrenciesSchema);

exports.checkCurrency = async function (DATABASE_PASSWORD, exec) {
  try {
    let currencies = await Currencies.find();
    let currenciesLength = currencies.length;
    console.log(`currenciesLength: ${currenciesLength}`);
    if (currenciesLength == 0) {
      const currenciesDb = path.join(
        process.cwd(),
        'jsonDump',
        'currencies.json'
      );
      let exec = require('child_process').exec;
      var addCurrencyCommand = `/usr/bin/mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
        process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
      } --collection currencies --type json --file ${currenciesDb}`;
      exec(addCurrencyCommand, async (err, stdout, stderr) => {
        // check for errors or if it was succesfuly
        console.log(`err: ${err}`);
        // await country.checkCountry(DATABASE_PASSWORD);
      });
    } else {
      // await country.checkCountry(DATABASE_PASSWORD);
    }
  } catch (error) {
    console.log(error);
  }
};
