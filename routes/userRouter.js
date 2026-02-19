import express from "express";
import { usersControllers } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerLoginSchema } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(registerLoginSchema),
  usersControllers.registerUserController
);

usersRouter.post(
  "/login",
  validateBody(registerLoginSchema),
  usersControllers.loginUserController
);

export default usersRouter;
