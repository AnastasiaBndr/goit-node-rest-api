import path from "path";
import fsPromises from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  if (contacts.length == 0) return null;
  for (let contact of contacts) {
    if (contact.id === contactId) {
      return contact;
    }
  }
  return null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const deleted = contacts[index];

  contacts.splice(index, 1);

  try {
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
    return deleted;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  try {
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    return null;
  }
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();

  try {
    const index = contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
      return null;
    }
    const updatedContact = {
      ...contacts[index],
      ...body,
    };

    contacts[index] = updatedContact;
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  } catch (error) {
    return null;
  }
}

const contactsService = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};

export default contactsService;
