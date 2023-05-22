import LICENSE_FEE_BILL from "../models/licenseFeeBill";

const licenseFeeBillServices = {
  createLicenseFeeBill: (newLicenseFeeBill) => {
    try {
      return LICENSE_FEE_BILL.create(newLicenseFeeBill);
    } catch (err) {
      return err;
    }
  },

  getAll: () => {
    try {
      const licenseFeeBillList = LICENSE_FEE_BILL.find({ deletedAt: null });
      if (!licenseFeeBillList) return { msg: "No license fee bill recorded" };
      return licenseFeeBillList;
    } catch (err) {
      return { err };
    }
  },

  getOne: (id) => {
    try {
      return LICENSE_FEE_BILL.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  },

  delete: (id) => {
    try {
      return LICENSE_FEE_BILL.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );
    } catch (err) {
      return err;
    }
  },

  update(id, newLicenseFeeBillData) {
    try {
      return LICENSE_FEE_BILL.updateOne({ _id: id }, { $set: newLicenseFeeBillData });
    } catch (err) {
      return err;
    }
  },
};

export default licenseFeeBillServices;