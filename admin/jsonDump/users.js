var mongoose = require("mongoose");
require("dotenv").config();
var roles = require("./roles");
const path = require("path");
const UsersSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    profileImageKey: { type: String, default: "" },
    finalFolder: { type: String, required: true },
    folderId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    cityName: { type: String },
    role_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
    ],
    roleName: { type: String, required: true },
    agents_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Agencies" }],
    city_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Countries" }],
    province_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Countries" }],
    provinceName: { type: String },
    country_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Countries" }],
    countryName: { type: String },
    position: { type: String },
    aboutMe: { type: String },
    isAdmin: { type: Boolean, default: false },
    isVercel: { type: Boolean },
    accessToken: { type: String, default: "" },
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

var Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

const usersDb = path.join(process.cwd(), "jsonDump", "users.json");

const checkUsers = {
  retrieveAll: function (DATABASE_PASSWORD) {
    return new Promise(async (resolve, reject) => {
      let length = await mongoose.connection.db
        .collection("users")
        .estimatedDocumentCount();
      if (length !== 0) {
        resolve(length);
      } else {
        var addUserCommand = `mongoimport --uri ${
          process.env.NODE_ENV == "development"
            ? process.env.DATABASE_URL_UAT
            : process.env.DATABASE_URL_LIVE
        } --collection users --type json --file ${usersDb}`;
        // `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@flashy-ears.saj8sxg.mongodb.net/${
        //   process.env.NODE_ENV == "development" ? "UAT" : "LIVE"
        // } --collection users --type json --file ${usersDb}`;
        var child = require("child_process").exec(addUserCommand);
        child.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
        });
        child.stdout.pipe(process.stdout);
        child.on("exit", async () => {
          resolve(
            await mongoose.connection.db
              .collection("users")
              .estimatedDocumentCount()
          );
        });
      }
    });
  },
};

module.exports = checkUsers;
