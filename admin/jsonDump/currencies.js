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

const currenciesDb = path.join(process.cwd(), 'jsonDump', 'currencies.json');

const checkCurrency = {
  retrieveAll: function (DATABASE_PASSWORD) {
    return new Promise(async (resolve, reject) => {
      let length = await mongoose.connection.db
        .collection('currencies')
        .estimatedDocumentCount();
      if (length !== 0) {
        resolve(length);
      } else {
        var addCurrencyCommand = `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
          process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
        } --collection currencies --type json --file ${currenciesDb}`;
        var child = require('child_process').exec(addCurrencyCommand);
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        child.stdout.pipe(process.stdout);
        child.on('exit', async () => {
          resolve(
            await mongoose.connection.db
              .collection('currencies')
              .estimatedDocumentCount()
          );
        });
      }
    });
  },
};

module.exports = checkCurrency;
