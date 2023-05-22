import express from "express";
import dotenv from "dotenv";
import UserControllers from "../controllers/users.controllers";
import { bodyRegisterValidator } from "../middlewares/validatorManager";
import iAmMyself from "../middlewares/iAmMyself";
import requireToken from "../middlewares/requireToken";
import isManager from "../middlewares/isManager";

dotenv.config();

const userRouter = express.Router();

// POST USER====================================
userRouter.post(
  "/api/users",
  bodyRegisterValidator,
  UserControllers.createUser,
);

// GET USERS====================================
userRouter.get(
  "/api/users",
  UserControllers.getUsers,
);

// GET USERS HARD====================================
userRouter.get(
  "/api/users/hard",
  UserControllers.getUsersHard,
);

// GET USER BY ID====================================
userRouter.get(
  "/api/user_id/:_id",
  UserControllers.getUser,
);

// GET USER HARD BY ID====================================
userRouter.get(
  "/api/user_id/hard/:_id",
  UserControllers.getUserHard,
);

// UPDATE USUARIO====================================
userRouter.put(
  "/api/users/:_id",
  UserControllers.updateUser,
);

// DELETE USER====================================
userRouter.delete(
  "/api/users/delete/:_id",
  requireToken,
  isManager,
  iAmMyself,
  UserControllers.deleteUser,
);

// DELETE HARD USER====================================
userRouter.delete(
  "/api/users/delete/hard/:_id",
  requireToken,
  isManager,
  iAmMyself,
  UserControllers.deleteUserHard,
);

export default userRouter;