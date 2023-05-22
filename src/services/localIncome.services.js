import LOCAL_INCOME from "../models/localIncome";

const localIncomesServices = {
  createLocalIncome: (newLocalIncome) => {
    try {
      return LOCAL_INCOME.create(newLocalIncome);
    } catch (err) {
      return err;
    }
  },

  getAll: () => {
    try {
      const localIncomeList = LOCAL_INCOME.find({ deletedAt: null });
      if (!localIncomeList) return { error: "No hay ingresos guardados" };
      return localIncomeList;
    } catch (err) {
      return { err };
    }
  },

  getOne: (id) => {
    try {
      return LOCAL_INCOME.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  },

  delete: (id) => {
    try {
      return LOCAL_INCOME.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );
    } catch (err) {
      return err;
    }
  },

  update(id, newLocalIncomeData) {
    try {
      return LOCAL_INCOME.updateOne({ _id: id }, { $set: newLocalIncomeData });
    } catch (err) {
      return err;
    }
  },
};

export default localIncomesServices;