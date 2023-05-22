import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');

const LocalSchemas = new Schema({
  condominium: { type: String, default: '' },
  building: { type: String, default: '' },
  number: { type: String, unique: true, index: { unique: true } },
  ubication: { type: String, default: '' },
  owner: { type: String, default: '' },
  dimentions: {
    type: Object,
    default: {
      squareMeter: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      length: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      levels: { type: Number, default: 0 },
    },
  },
  use: { type: String, default: '' },
  deletedAt: { type: String, default: null },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
});

LocalSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

LocalSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

const LOCAL = model("locals", LocalSchemas);
export default LOCAL;