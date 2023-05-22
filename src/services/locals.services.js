import LOCAL from "../models/locals";

const localsServices = {
  createLocal: (newLocal) => {
    try {
      return LOCAL.create(newLocal);
    } catch (err) {
      return err;
    }
  },

  getAll: () => {
    try {
      return LOCAL.find({ deletedAt: null });
    } catch (err) {
      return { err, msg: "Success!" };
    }
  },

  getOne: (id) => {
    try {
      return LOCAL.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  },

  delete: (id) => {
    try {
      return LOCAL.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );
    } catch (err) {
      return err;
    }
  },

  update(id, newLocalData) {
    try {
      return LOCAL.updateOne({ _id: id }, { $set: newLocalData });
    } catch (err) {
      return err;
    }
  },
};

export default localsServices;