import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');

const LocalIncomeSchemas = new Schema(
  {
    paymentDate: { type: String, default: today },
    monthToPay: { type: String, default: '' },
    local: { type: String, default: 'local1' },
    outstandingBalance: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    proofOfPayment: { type: String, default: 0 },
    deletedAt: { type: String, default: null },
    createdAt: { type: String, default: '' },
    updatedAt: { type: String, default: '' },
  },
);

LocalIncomeSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

LocalIncomeSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

const LOCAL_INCOME = model("localIncomes", LocalIncomeSchemas);
export default LOCAL_INCOME;