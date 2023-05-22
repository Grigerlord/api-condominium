import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import swaggerOptions from "../documentation/options";
import AuthController from "../controllers/auth.controllers";
import validateUserRole from "../middlewares/isManager";

dotenv.config();

const router = Router();

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//= =======================================SWAGGER DOCS====================================================
router.use("/api/docs", swaggerUI.serve);
router.get("/api/docs", swaggerUI.setup(swaggerDocs, { explorer: true }));

/* ========================================INFOUSER==================================================== */
router.get("/api/infouser/protected", validateUserRole, AuthController.infoUser);

module.exports = router;
