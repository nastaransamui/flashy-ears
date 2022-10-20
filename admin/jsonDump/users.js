var mongoose = require('mongoose');
require('dotenv').config();
var roles = require('./roles');
const path = require('path');
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

exports.checkUsers = async function (DATABASE_PASSWORD, exec) {
  try {
    let users = await Users.find();
    let usersLength = users.length;
    console.log(`usersLength: ${usersLength}`);
    if (usersLength == 0) {
      const usersDb = path.join(process.cwd(), 'jsonDump', 'users.json');

      let exec = require('child_process').exec;
      var addUserCommand = `/usr/bin/mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
        process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
      } --collection users --type json --file ${usersDb}`;
      exec(addUserCommand, async (err, stdout, stderr) => {
        // check for errors or if it was succesfuly
        console.log(`err: ${err}`);
        console.log(usersDb);
        // await roles.checkRoles(DATABASE_PASSWORD);
      });
    } else {
      // await roles.checkRoles(DATABASE_PASSWORD);
    }
  } catch (error) {
    console.log(error);
  }
};
