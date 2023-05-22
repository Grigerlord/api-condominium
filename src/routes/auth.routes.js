import { Router } from "express";
import dotenv from "dotenv";
import AuthControllers from "../controllers/auth.controllers";
import requireRefreshToken from "../middlewares/requireRefreshToken";
import { bodyLoginValidator } from "../middlewares/validatorManager";

dotenv.config();

const authRoutes = Router();

// ================LOGIN================================
authRoutes.post(
  "/api/auth",
  bodyLoginValidator,
  AuthControllers.logIn,
);

// ================REFRESH==============================
authRoutes.get(
  "/api/refresh",
  requireRefreshToken,
  AuthControllers.refreshToken,
);

// ================LOGOUT===============================
authRoutes.get(
  "/api/logout",
  AuthControllers.logout,
);

export default authRoutes;
