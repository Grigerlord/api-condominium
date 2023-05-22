import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';
// import uniqid from 'uniqid';

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');

const licenseFeeBillSchemas = new Schema(
  {
    // saleId: { type: String, default: uniqid() },
    saleDate: { type: Date, default: today },
    // saleDate: { type: String, default: today, require: true },
    client: { type: String, default: "Generic client" },
    clientEmail: { type: String, default: '' },
    clientIdentDocument: { type: String, default: '' },
    // typeLicense: { type: Schema.Types.ObjectId, ref: 'typeLicenses', default: null },
    typeLicense: { type: String, default: '' },
    effectiveDate: { type: String, default: today },
    expirationDate: { type: String, default: 'Tomorrow' },
    amount: { type: Number, require: true },
    proofOfPayment: { type: String, default: 'withput proof' },
    deletedAt: { type: String, default: null },
    createdAt: { type: String, default: '' },
    updatedAt: { type: String, default: '' },
  },
);

licenseFeeBillSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

licenseFeeBillSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

const LICENSE_FEE_BILL = model("licenseFeeBill", licenseFeeBillSchemas);
export default LICENSE_FEE_BILL;