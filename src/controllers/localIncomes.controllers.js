import localIncomesService from "../services/localIncome.services";

class LocalIncomesController {
  // ================CREATE LOCALE_INCOME=======================
  async createLocalIncome(req, res) {
    try {
      const {
        paymentDate,
        monthToPay,
        local,
        outstandingBalance,
        paymentMethod,
        amount,
        proofOfPayment,
      } = req.body;

      // Verificacion de datos
      if (!paymentDate || !monthToPay || !local || !outstandingBalance || !paymentMethod || !amount || !proofOfPayment) {
        return res.status(400).json({
          isStored: false,
          message: "More items are required!",
        });
      }

      const newLocalIncome = req.body;
      const localIncomeStored = await localIncomesService.createLocalIncome(
        newLocalIncome,
      );
      return res.status(200).json({
        isStored: true,
        data: localIncomeStored,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================GET LOCAL_INCOMES==============================
  async getAll(req, res) {
    try {
      const allLocalIncomes = await localIncomesService.getAll();
      return res.status(200).json({
        data: allLocalIncomes,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================GET LOCAL_INCOME BY ID=========================
  async getOne(req, res) {
    try {
      const _id = req.params;

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(404).json({ error: "ID malformed!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const localIncome = await localIncomesService.getOne(_id);

      // comprueba que exista la licencia en la DBB
      if (localIncome === null) return res.status(404).json({ error: "license ID not found!" });

      return res.status(200).json({
        data: localIncome,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // // ================UPDATE LOCAL_INCOME======================
  // async update(req, res) {
  //   try {
  //     const { _id } = req.params;

  //     // Se confirma que el id tiene un formato valido de 24 caracteres
  //     if (_id.length !== 24) return res.status(404).json({ error: "Id malformed!" });

  //     // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
  //     const localIncome = await localIncomesService.getOne(_id);

  //     // comprueba que exista la licencia en la DBB
  //     if (localIncome === null) return res.status(404).json({ error: "No existe una licencia con este ID!" });

  //     const oldLocalIncome = await localIncomesService.getOne(_id);
  //     if (!oldLocalIncome) {
  //       return res.status(404).json({
  //         message: "Icome data is not found!",
  //       });
  //     }
  //     const updatedLocalIncome = {
  //       ...oldLocalIncome._doc,
  //       ...req.body,
  //     };
  //     const response = await localIncomesService.update(
  //       _id,
  //       updatedLocalIncome,
  //     );

  //     const newLocalIncome = await await localIncomesService.getOne(_id);

  //     return res.status(200).json({
  //       isUpdated: true,
  //       response,
  //       data: newLocalIncome,
  //     });
  //   } catch (error) {
  //     return res.status().json({ error });
  //   }
  // }

  // ================DELETE LOCAL_INCOME======================
  //   async delete(req, res) {
  //     const { id } = req.params;
  //     const response = await localIncomesService.delete(id);
  //     return res.status(200).json({
  //       status: 200,
  //       isDeleted: true,
  //       data: response,
  //     });
  //   }
}

export default new LocalIncomesController();
