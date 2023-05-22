import LICENSE from "../models/typeLicense";

const licensesService = {
  store: (newLicense) => {
    try {
      return LICENSE.create(newLicense);
    } catch (err) {
      return err;
    }
  },

  getAll: () => {
    try {
      return LICENSE.find({ deletedAt: null });
    } catch (err) {
      return err;
    }
  },

  getAllHard: () => {
    try {
      return LICENSE.find();
    } catch (err) {
      return err;
    }
  },

  getOne: (id) => {
    try {
      return LICENSE.findOne({
        _id: id,
        deletedAt: null,
      });
    } catch (err) {
      return err;
    }
  },

  getOneHard: (id) => {
    try {
      return LICENSE.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  },

  delete: (id) => {
    try {
      return LICENSE.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );
    } catch (err) {
      return err;
    }
  },

  hardDelete: (license) => {
    try {
      return license.delete();
    } catch (err) {
      return err;
    }
  },

  update(id, newLicenseData) {
    try {
      return LICENSE.updateOne({ _id: id }, { $set: newLicenseData });
    } catch (err) {
      return err;
    }
  },
};

export default licensesService;