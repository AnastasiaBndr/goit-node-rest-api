import express from "express";
import contactControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import auth from "../middlewares/auth.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, contactControllers.getAllContactsController);

contactsRouter.get("/:id", auth, contactControllers.getOneContactController);

contactsRouter.delete("/:id", auth, contactControllers.deleteContactController);

contactsRouter.post(
  "/",
  auth,
  validateBody(createContactSchema),
  contactControllers.createContactController
);

contactsRouter.put(
  "/:id",
  auth,
  validateBody(updateContactSchema),
  contactControllers.updateContactController
);

contactsRouter.patch(
  "/:id/favorite",
  auth,
  validateBody(updateFavoriteSchema),
  contactControllers.updateStatusContactController
);

export default contactsRouter;
