var mongoose = require('mongoose');
require('dotenv').config();
const CryptoJS = require('crypto-js');
const fs = require('fs');
const UsersSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: '' },
    profileImageKey: { type: String, default: '' },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    cityName: { type: String },
    role_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true },
    ],
    roleName: { type: String, required: true },
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agencies' }],
    city_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    province_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    provinceName: { type: String },
    country_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }],
    countryName: { type: String },
    position: { type: String },
    aboutMe: { type: String },
    isAdmin: { type: Boolean, default: false },
    isVercel: { type: Boolean },
    accessToken: { type: String, default: '' },
    twitter: [
      {
        twitterId: String,
        twitterUserName: String,
        twitterdipslayName: String,
        twitterProfile: String,
        twitterlocation: String,
        twitterBanner: String,
      },
    ],
    facebook: [],
    google: [],
  },
  { timestamps: true }
);

var Users = mongoose.models.Users || mongoose.model('Users', UsersSchema);

const { DATABASE_URL_UAT, DATABASE_URL_LIVE } = process.env;

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

async function createUserIsEmpty() {
  try {
    const dbConnected = await dbConnect();
    const { success, error } = dbConnected;
    if (success) {
      let userCollectionIsEmpty = await Users.find();
      console.log(userCollectionIsEmpty.length);
      if (userCollectionIsEmpty.length == 0) {
        const userName = process.env.NEXT_PUBLIC_USERNAME;
        const isVercel =
          process.env.NEXT_PUBLIC_SERVERLESS == 'true' ? true : false;
        const cryptoPassword = CryptoJS.AES.encrypt(
          process.env.NEXT_PUBLIC_PASSWORD,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();
        const roleJson = fs.readFileSync(
          process.cwd() + '/jsonDump/superUserRole.json'
        );
        let role = JSON.parse(roleJson);
        await Users.create({
          userName: userName,
          password: cryptoPassword,
          profileImage: '',
          profileImageKey: '',
          finalFolder: 'users',
          folderId: (Math.random() + 1).toString(36).substring(7),
          firstName: '',
          lastName: '',
          cityName: '',
          role_id: [],
          roleName: role.roleName,
          agents_id: [],
          city_id: [],
          provinde_id: [],
          provinceName: '',
          country_id: [],
          countryName: '',
          position: '',
          aboutMe: '',
          isAdmin: true,
          isVercel: isVercel,
          accessToken: '',
          twitter: [],
          facebook: [],
          google: [],
        });
        process.exit();
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
createUserIsEmpty();
