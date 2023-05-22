import { Router } from "express";
import dotenv from "dotenv";
import LogHistoryControllers from "../controllers/logHistory.controllers";
import requireToken from "../middlewares/requireToken";
import isManager from "../middlewares/isManager";

dotenv.config();

const logHistoryRoutes = Router();

// ================GET RECORDS================================
logHistoryRoutes.get(
  "/api/loghistory",
  requireToken,
  isManager,
  LogHistoryControllers.getRecords,
);

export default logHistoryRoutes;