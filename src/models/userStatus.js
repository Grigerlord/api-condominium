import mongoose from 'mongoose';

const StatusSchemas = new mongoose.Schema({
  nemeStatus: { type: String, default: "" },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },

});

module.exports = mongoose.model("status", StatusSchemas);