var users = require('./jsonDump/users');
var roles = require('./jsonDump/roles');
var mongoose = require('mongoose');

require('dotenv').config();
const { DATABASE_URL_UAT, DATABASE_URL_LIVE, DATABASE_PASSWORD } = process.env;

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

async function checkDbs() {
  const dbConnected = await dbConnect();
  const { success, error } = dbConnected;
  if (success) {
    let usersLength = await users.retrieveAll(DATABASE_PASSWORD);
    console.log(`usersLength: ${usersLength}`);
    let rolesLength = await roles.retrieveAll(DATABASE_PASSWORD);
    console.log(`rolesLength: ${rolesLength}`);
  } else {
    console.log(error);
  }
}
checkDbs();
