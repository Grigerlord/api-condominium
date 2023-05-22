import express from "express";
import dotenv from "dotenv";
import requireToken from "../middlewares/requireToken";
import isAdministrator from "../middlewares/isAdministrator";
import licenseFeeBillControllers from "../controllers/licenseFeeBill.controllers";
import { bodyLicenseFeeBillValidator } from '../middlewares/validatorManager';

dotenv.config();

const licenseFeeBillRoutes = express.Router();

// ==========CREATE LICENSE_FEE_BILL=================
licenseFeeBillRoutes.post(
  "/api/license-fee-bill",
  requireToken,
  isAdministrator,
  bodyLicenseFeeBillValidator,
  licenseFeeBillControllers.createLicenseFeeBill,
);

// ==========GET LICENSE_FEE_BILL=========================
licenseFeeBillRoutes.get(
  "/api/license-fee-bill",
  requireToken,
  isAdministrator,
  licenseFeeBillControllers.getAll,
);

// =========GET LICENSE_FEE_BILL BY ID==============
licenseFeeBillRoutes.get(
  "/api/license-fee-bill/:_id",
  requireToken,
  isAdministrator,
  licenseFeeBillControllers.getOne,
);

// // =========UPDATE LICENSE_FEE_BILL=================
// licenseFeeBillRoutes.put(
//   "/api/license-fee-bill/:_id",
//   requireToken,
//   isAdministrator,
//   licenseFeeBillControllers.update,
// );

// =========DELETE LICENSE_FEE_BILL=================
// licenseFeeBillRoutes.delete(
//   "/api/license-fee-bill/:_id",
//   requireToken,
//   isManager,
//   licenseFeeBillControllers.delete,
// );

export default licenseFeeBillRoutes;
