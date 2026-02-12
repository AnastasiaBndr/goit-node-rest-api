import contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contact = await contactsService.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;
    const body = req.body;
    const contact = await contactsService.updateContact(id, body);
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
