import express from "express";
import dotenv from "dotenv";
import requireToken from "../middlewares/requireToken";
import isAdministrator from "../middlewares/isAdministrator";
import localsControllers from "../controllers/locals.controllers";
import { bodyLocalValidator } from '../middlewares/validatorManager';

dotenv.config();

const localsRoutes = express.Router();

// ==========CREATE CONDOMINIUM=================
localsRoutes.post(
  "/api/local",
  requireToken,
  isAdministrator,
  bodyLocalValidator,
  localsControllers.createLocal,
);

// ==========GET LOCALS=========================
localsRoutes.get(
  "/api/local",
  requireToken,
  isAdministrator,
  localsControllers.getAll,
);

// =========GET CONDOMINIUM BY ID==============
localsRoutes.get(
  "/api/local/:_id",
  requireToken,
  isAdministrator,
  localsControllers.getOne,
);

// =========UPDATE CONDOMINIUM=================
localsRoutes.put(
  "/api/local/:_id",
  requireToken,
  isAdministrator,
  // bodyLocalValidator,
  localsControllers.update,
);

// =========DELETE CONDOMINIUM=================
localsRoutes.delete(
  "/api/local/:_id",
  requireToken,
  isAdministrator,
  localsControllers.delete,
);

export default localsRoutes;
