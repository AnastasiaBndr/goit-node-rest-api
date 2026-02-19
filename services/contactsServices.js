import Contact from "../db/models/Contact.js";

const listContacts = async () => {
  const contacts = await Contact.findAll();
  return contacts;
};
const getContactById = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  return contact;
};
const removeContact = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

const addContact = async (name, email, phone) => {
  const contact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
  });
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(body);

  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });

  return contact;
};

const contactsService = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};

export default contactsService;
