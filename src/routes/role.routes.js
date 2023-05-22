import express from "express";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import roleControllers from "../controllers/userRoles";
import requireToken from "../middlewares/requireToken";
import isManager from "../middlewares/isManager";
import { bodyRolesValidator } from "../middlewares/validatorManager";

dotenv.config();

const roleRoutes = express.Router();

// =================VALIDACIONES DE UPDATE(modularuzar!)====================
const validateUpdateRoleCamps = [
  body('name', "La propiedad 'name' debe ser un string!")
    .if(body('name').exists())
    .isString()
    .trim(),
  body('description', "La propiedad 'description' debe ser un string!")
    .if(body('description').exists())
    .isString()
    .trim(),
  body('description', "La descripcion debe tener minimo 30 caracteres!")
    .if(body('description').exists())
    .isLength({ min: 30 }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: msg });
    }
    next();
    return null;
  },
];

// ==========CREATE ROLE=================
roleRoutes.post(
  "/api/roles/create",
  requireToken,
  isManager,
  bodyRolesValidator,
  roleControllers.createRole,
);

// ==========GET ROLES==================
roleRoutes.get(
  "/api/roles/get",
  requireToken,
  isManager,
  roleControllers.getRolesSoft,
);

// ==========GET ROLES HARD==================
roleRoutes.get(
  "/api/roles/get/hard",
  requireToken,
  isManager,
  roleControllers.getRoles,
);

// =========GET ROLES BY ID==================
roleRoutes.get(
  "/api/role_id/:_id",
  requireToken,
  isManager,
  roleControllers.getRole,
);

// =========GET ROLES BY ID HARD==================
roleRoutes.get(
  "/api/role_id/hard/:_id",
  requireToken,
  isManager,
  roleControllers.getRoleHard,
);

// =========UPDATE ROLE=================
roleRoutes.put(
  "/api/roles/:_id",
  requireToken,
  isManager,
  validateUpdateRoleCamps,
  roleControllers.updateRole,
);

// =========HARD DELETE ROLE=================
roleRoutes.delete(
  "/api/hd-roles/:_id",
  requireToken,
  isManager,
  roleControllers.deleteRole,
);

// =========DSOFT ELETE ROLE=================(sd = soft delete)
roleRoutes.delete(
  "/api/sd-roles/:_id",
  requireToken,
  isManager,
  roleControllers.softDeleteRole,
);

export default roleRoutes;
