import express from "express";
import { usersControllers } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  contactAuthSchema,
  updateSubscriptionSchema,
} from "../schemas/usersSchemas.js";
import auth from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(contactAuthSchema),
  usersControllers.registerUserController
);

usersRouter.post(
  "/login",
  validateBody(contactAuthSchema),
  usersControllers.loginUserController
);

usersRouter.post("/logout", auth, usersControllers.logoutUserController);

usersRouter.get("/current", auth, usersControllers.currentUserController);

usersRouter.patch(
  "/subscription",
  auth,
  validateBody(updateSubscriptionSchema),
  usersControllers.updateUserController
);

export default usersRouter;
