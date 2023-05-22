import express from "express";
import dotenv from "dotenv";
import requireToken from "../middlewares/requireToken";
import isAdministrator from "../middlewares/isAdministrator";
import { bodyLocalIncomeValidator } from "../middlewares/validatorManager";
import LocalIncomesControllers from '../controllers/localIncomes.controllers';

dotenv.config();

const localIncomesRoutes = express.Router();

// ==========CREATE LOCAL_INCOME=================
localIncomesRoutes.post(
  "/api/local-incomes",
  requireToken,
  isAdministrator,
  bodyLocalIncomeValidator,
  LocalIncomesControllers.createLocalIncome,
);

// ==========GET LOCAL_INCOMES==================
localIncomesRoutes.get(
  "/api/local-incomes",
  requireToken,
  isAdministrator,
  LocalIncomesControllers.getAll,
);

// =========GET LOCAL_INCOME BY ID=============
localIncomesRoutes.get(
  "/api/local-incomes_id/:_id",
  requireToken,
  isAdministrator,
  LocalIncomesControllers.getOne,
);

// =========UPDATE LOCAL_INCOME=================
// localIncomesRoutes.put(
//   "/api/local-incomes/:_id",
//   requireToken,
//   isAdministrator,
//   LocalIncomesControllers.update,
// );

// =========DELETE LOCAL_INCOME=================
// localIncomesRoutes.delete(
//   "/api/local/incomes/:_id",
//   requireToken,
//   isAdministrator,
//   localIncomesControllers.deleteLocalIncome,
// );

export default localIncomesRoutes;
