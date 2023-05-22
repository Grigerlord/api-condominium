import dotenv from "dotenv";
import moment from "moment";
import mongoose from "mongoose";

dotenv.config();

class Database {
  constructor() {
    const dbUser = encodeURIComponent(process.env.DDB_USER || "");
    const dbPwd = encodeURIComponent(process.env.DDB_PASSWORD || "");
    let dbAuthString = "";

    if (dbUser !== "" && typeof dbUser === "string") {
      dbAuthString = `${dbUser}:${dbPwd}@`;
    }

    const connect = `mongodb://${dbAuthString}${encodeURIComponent(
      process.env.DDB_HOST,
    )}:${encodeURIComponent(process.env.DDB_PORT)}/${encodeURIComponent(
      process.env.DDB_NAME,
    )}`;

    mongoose.set('strictQuery', true);

    this.connection = mongoose
      .connect(connect)
      .then(() => {
        console.log("Connected successfully to the database");
      })
      .catch((error) => {
        console.error(`${moment().toISOString()} - Database Connection.`);
        console.error(error);
        process.exit(500);
      });
  }
}

const DB = new Database();
module.exports = DB;