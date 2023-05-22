import mongoose from 'mongoose';
import moment from 'moment-timezone';

const permissionsSchemas = new mongoose.Schema({
  name: { type: String, default: '' },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
});

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');
permissionsSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

permissionsSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

module.exports = mongoose.model("users", permissionsSchemas);