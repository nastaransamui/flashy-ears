import mongoose from "mongoose";

const { DATABASE_URL_UAT, DATABASE_URL_LIVE } = process.env;

if (process.env.NODE_ENV == "development") {
  if (!DATABASE_URL_UAT) {
    new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
} else {
  if (!DATABASE_URL_LIVE) {
    new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
}

declare global {
  var mongoose: any;
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
      const connectionUrl: string =
        process.env.NODE_ENV == "development"
          ? DATABASE_URL_UAT!
          : DATABASE_URL_LIVE!;

      // Set the strictQuery option explicitly
      mongoose.set("strictQuery", true);
      cached.promise = mongoose.connect(connectionUrl).then(() => {
        const database = mongoose.connection;
        database.on("error", (err) => {
          cached.success = false;
        });
        database.once("open", () => {
          cached.success = true;
          console.log("Connected to database...");
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

export default dbConnect;
