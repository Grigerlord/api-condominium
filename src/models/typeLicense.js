import { Schema, model } from "mongoose";
import moment from 'moment-timezone';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY hh:mm:ss a');

const typeLicenseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  modules: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

typeLicenseSchema.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

typeLicenseSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

const LICENSE = model("typeLicense", typeLicenseSchema);
export default LICENSE;
