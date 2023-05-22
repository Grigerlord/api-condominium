import { Router } from "express";
import dotenv from "dotenv";
import TypeLicensesController from "../controllers/typeLicense.controllers";
import requireToken from "../middlewares/requireToken";
import isManager from "../middlewares/isManager";
import { bodyTypeLicensesValidator } from '../middlewares/validatorManager';

dotenv.config();

const TypeLicensesRoutes = Router();

TypeLicensesRoutes.post(
  "/api/typelicenses",
  requireToken,
  isManager,
  bodyTypeLicensesValidator,
  TypeLicensesController.store,
);

TypeLicensesRoutes.get(
  "/api/typelicenses/get-all",
  requireToken,
  isManager,
  TypeLicensesController.getAll,
);

TypeLicensesRoutes.get(
  "/api/typelicenses/get-all/hard",
  requireToken,
  isManager,
  TypeLicensesController.getAllHard,
);

TypeLicensesRoutes.get(
  "/api/typelicenses/get-one/:_id",
  requireToken,
  isManager,
  TypeLicensesController.getOne,
);

TypeLicensesRoutes.get(
  "/api/typelicenses/get-one/hard/:_id",
  requireToken,
  isManager,
  TypeLicensesController.getOneHard,
);

TypeLicensesRoutes.delete(
  "/api/typelicenses/delete/:id",
  requireToken,
  isManager,
  TypeLicensesController.delete,
);

TypeLicensesRoutes.delete(
  "/api/typelicenses/delete/hard/:id",
  requireToken,
  isManager,
  TypeLicensesController.deleteHard,
);

TypeLicensesRoutes.put(
  "/api/typelicenses/:id",
  requireToken,
  isManager,
  TypeLicensesController.update,
);

export default TypeLicensesRoutes;
