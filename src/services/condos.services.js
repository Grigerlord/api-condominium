import CONDOMINIUM from "../models/condominium";

const condosServices = {
  createCondominium: (newCondominium) => {
    try {
      return CONDOMINIUM.create(newCondominium);
    } catch (err) {
      return err;
    }
  },

  getAll: () => {
    try {
      return CONDOMINIUM.find({ deletedAt: null });
    } catch (err) {
      return { err, msg: "Success!" };
    }
  },

  getOne: (id) => {
    try {
      return CONDOMINIUM.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  },

  delete: (id) => {
    try {
      return CONDOMINIUM.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );
    } catch (err) {
      return err;
    }
  },

  update(id, newCondominiumData) {
    try {
      return CONDOMINIUM.updateOne({ _id: id }, { $set: newCondominiumData });
    } catch (err) {
      return err;
    }
  },
};

export default condosServices;