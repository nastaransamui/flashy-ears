var mongoose = require('mongoose');
require('dotenv').config();
var toBoolean = require('to-boolean');
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

const RolesSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true, unique: true, index: true },
    users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    isActive: { type: Boolean, default: true },
    remark: { type: String },
    icon: String,
    routes: [
      {
        state: String,
        access: { type: Boolean, default: true },
        update: { type: Boolean, default: true },
        delete: { type: Boolean, default: true },
        create: { type: Boolean, default: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

var Users = mongoose.models.Users || mongoose.model('Users', UsersSchema);
var Roles = mongoose.models.Roles || mongoose.model('Roles', RolesSchema);

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
const userName = process.env.NEXT_PUBLIC_USERNAME;
const isVercel = toBoolean(process.env.NEXT_PUBLIC_SERVERLESS);
const cryptoPassword = CryptoJS.AES.encrypt(
  process.env.NEXT_PUBLIC_PASSWORD,
  process.env.NEXT_PUBLIC_SECRET_KEY
).toString();
async function createUserIsEmpty() {
  try {
    const dbConnected = await dbConnect();
    const { success, error } = dbConnected;
    if (success) {
      let userCollectionIsEmpty = await Users.find();

      const roleJson = fs.readFileSync(
        process.cwd() + '/jsonDump/superUserRole.json'
      );
      let role = JSON.parse(roleJson);
      let superUserRole = await Roles.findOne({
        roleName: role.roleName,
      });
      console.log(
        `userCollectionIsEmpty.length: ${userCollectionIsEmpty.length}`
      );
      if (userCollectionIsEmpty.length == 0) {
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
        console.log(`superUserRole: ${superUserRole}`);
        if (superUserRole == null) {
          const newRoleValue = await new Roles(role);
          await newRoleValue.save(async (err, role) => {
            if (err) {
              res.status(500).json({ success: false, Error: err });
            } else {
              const newlyUserCreatedArray = await Users.find();
              const userId = newlyUserCreatedArray[0]._id;
              role.users_id.push(userId);
              newlyUserCreatedArray[0].role_id.push(role._id);
              role.save(async (err, newRole) => {
                if (err) {
                  res.status(500).json({ success: false, Error: err });
                } else {
                  const updatedUser = newlyUserCreatedArray[0];
                  await updatedUser.save(async (error, user) => {
                    if (err) {
                      res.status(500).json({ success: false, Error: err });
                    } else {
                      user.save(async (err, newUser) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('done');
                          process.exit();
                        }
                      });
                    }
                  });
                }
              });
            }
          });
          // process.exit();
          console.log(`newRoleValue: ${newRoleValue}`);
        } else {
          const newlyUserCreatedArray = await Users.find();
          const userId = newlyUserCreatedArray[0]._id;
          superUserRole.users_id.push(userId);
          newlyUserCreatedArray[0].role_id.push(superUserRole._id);
          superUserRole.save(async (err, newRole) => {
            if (err) {
              console.log(err);
              process.exit();
            } else {
              const updatedUser = newlyUserCreatedArray[0];
              await updatedUser.save(async (error, user) => {
                if (error) {
                  console.log(error);
                  process.exit();
                } else {
                  user.save(async (erroro, newUser) => {
                    if (erroro) {
                      console.log(erroro);
                      process.exit();
                    } else {
                      process.exit();
                    }
                  });
                }
              });
            }
          });
          process.exit();
        }
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
