import contactsService from "../services/contactsServices.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts(req.user.id, req.query);
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id, req.user.id);
  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id, req.user.id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await contactsService.addContact(
    name,
    email,
    phone,
    req.user.id
  );
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { id } = req.params;
  const body = req.body;
  const contact = await contactsService.updateContact(id, body, req.user.id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const contact = await contactsService.updateStatusContact(
    id,
    body,
    req.user.id
  );
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const contactControllers = {
  getAllContactsController: ctrlWrapper(getAllContacts),
  getOneContactController: ctrlWrapper(getOneContact),
  deleteContactController: ctrlWrapper(deleteContact),
  createContactController: ctrlWrapper(createContact),
  updateContactController: ctrlWrapper(updateContact),
  updateStatusContactController: ctrlWrapper(updateStatusContact),
};

export default contactControllers;
