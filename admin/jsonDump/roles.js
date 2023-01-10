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

const rolesDb = path.join(process.cwd(), 'jsonDump', 'roles.json');
const checkRoles = {
  retrieveAll: function (DATABASE_PASSWORD) {
    return new Promise(async (resolve, reject) => {
      let length = await mongoose.connection.db
        .collection('roles')
        .estimatedDocumentCount();
      if (length !== 0) {
        resolve(length);
      } else {
        var addRolesCommand = `mongoimport --uri mongodb+srv://dbUser:${DATABASE_PASSWORD}@flashy-ears.saj8sxg.mongodb.net/${
          process.env.NODE_ENV == 'development' ? 'UAT' : 'LIVE'
        } --collection roles --type json --file ${rolesDb}`;
        var child = require('child_process').exec(addRolesCommand);
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        child.stdout.pipe(process.stdout);
        child.on('exit', async () => {
          resolve(
            await mongoose.connection.db
              .collection('roles')
              .estimatedDocumentCount()
          );
        });
      }
    });
  },
};

module.exports = checkRoles;
