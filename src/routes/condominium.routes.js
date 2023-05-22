import express from "express";
import dotenv from "dotenv";
import requireToken from "../middlewares/requireToken";
import isAdministrator from "../middlewares/isAdministrator";
import condosControllers from "../controllers/condos.controllers";

dotenv.config();

const condosRoutes = express.Router();

// ==========CREATE CONDOMINIUM=================
condosRoutes.post(
  "/api/condominium",
  requireToken,
  isAdministrator,
  condosControllers.createCondominium,
);

// ==========GET CONDOS=========================
condosRoutes.get(
  "/api/condominium",
  requireToken,
  isAdministrator,
  condosControllers.getAll,
);

// =========GET CONDOMINIUM BY ID==============
condosRoutes.get(
  "/api/condominium/:_id",
  requireToken,
  isAdministrator,
  condosControllers.getOne,
);

// =========UPDATE CONDOMINIUM=================
condosRoutes.put(
  "/api/condominium/:_id",
  requireToken,
  isAdministrator,
  condosControllers.update,
);

// =========DELETE CONDOMINIUM=================
condosRoutes.delete(
  "/api/condominium/:_id",
  requireToken,
  isAdministrator,
  condosControllers.delete,
);

export default condosRoutes;
