import mongoose from "mongoose";
import moment from "moment-timezone";

const today = moment().tz("America/Caracas").format("DD-MM-YYYY hh:mm:ss a");

const LogHistorySchemas = new mongoose.Schema({
  userId: { type: String, default: "" },
  domain: { type: String, default: "" },
  typeOperation: { type: String, default: "" },
  request: { type: Object, default: "" },
  createdAt: { type: String, default: "" },
});

LogHistorySchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

module.exports = mongoose.model("logHistory", LogHistorySchemas);
