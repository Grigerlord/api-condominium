import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');

const BuildingSchemas = new Schema({
  condominium: { type: String, default: '' },
  number: { type: Number, default: 0 },
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
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
});

BuildingSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

BuildingSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

const BUILDING = model("buildings", BuildingSchemas);
export default BUILDING;