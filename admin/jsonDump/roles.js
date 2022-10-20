var mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');
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

var Roles = mongoose.models.Roles || mongoose.model('Roles', RolesSchema);

exports.checkRoles = async function (DATABASE_PASSWORD, exec) {
  try {
    let roles = await Roles.find();
    let rolesLength = roles.length;
    console.log(`rolesLength: ${rolesLength}`);
    if (rolesLength == 0) {
      const rolesDb = path.join(process.cwd(), 'jsonDump', 'roles.json');
      let exec = require('child_process').exec;
      var addRoleCommand = `/usr/bin/mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@admintypescript.0zjh9yz.mongodb.net/${
        process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
      } --collection roles --type json --file ${rolesDb}`;
      exec(addRoleCommand, async (err, stdout, stderr) => {
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
