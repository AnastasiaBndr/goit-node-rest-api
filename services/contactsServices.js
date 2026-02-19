import Contact from "../db/models/Contact.js";

const listContacts = async (userId) => {
  const contacts = await Contact.findAll({ where: { owner: userId } });
  return contacts;
};
const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    where: { id:contactId,owner: userId },
  });
  if (!contact) return null;
  return contact;
};
const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOne({
    where: { owner: userId,id:contactId },
  });
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

const addContact = async (name, email, phone, userId) => {
  const contact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    owner: userId,
  });
  return contact;
};

const updateContact = async (contactId, body, userId) => {
  const contact = await getContactById(contactId, userId);
  if (!contact) return null;

  await contact.update(body);

  return contact;
};

const updateStatusContact = async (contactId, body, userId) => {
  const contact = await getContactById(contactId, userId);
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
