import express from "express";
import { contactControllers } from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactControllers.getAllContactsController);

contactsRouter.get("/:id", contactControllers.getOneContactController);

contactsRouter.delete("/:id", contactControllers.deleteContactController);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactControllers.createContactController
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactControllers.updateContactController
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  contactControllers.updateStatusContactController
);

export default contactsRouter;
