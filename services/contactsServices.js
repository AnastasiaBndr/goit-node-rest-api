import path from "path";
import fsPromises from "fs/promises";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  if (contacts.length == 0) return null;
  for (let contact of contacts) {
    if (contact.id == contactId) {
      return contact;
    }
  }
  return null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  if (contacts.length == 0) return null;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id == contactId) {
      let deleted = contacts[i];
      contacts.splice(i, 1);

      try {
        await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
      } catch (error) {
        console.log(error);
        return null;
      }
      return deleted;
    }
  }
  return null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now().toString(36) + Math.random().toString(36),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  try {
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { listContacts, getContactById, removeContact, addContact };
