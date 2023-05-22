import mongoose from 'mongoose';
import moment from 'moment-timezone';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');

const UserRolesSchemas = new mongoose.Schema({
  name: { type: String, default: 'administrator' },
  description: { type: String, default: 'This user is only registered in the website.' },
  permissions: { type: Array, default: [] },
  deletedAt: { type: String, default: null },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
});

UserRolesSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

UserRolesSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

module.exports = mongoose.model("userRoles", UserRolesSchemas);