import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');

const CondominiumSchemas = new Schema({
  c_id: { type: String, default: '' },
  name: { type: String, default: 'My condominium' },
  buildings: { type: Array, default: [] },
  address: {
    type: Object,
    default: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  },
  deletedAt: { type: Date, default: null },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
});

CondominiumSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

CondominiumSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

const CONDOMINIUM = model("condos", CondominiumSchemas);
export default CONDOMINIUM;