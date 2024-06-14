const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function getContactById(contactId) {
  return listContacts()
    .then((contacts) => {
      const contact = contacts.find((c) => c.id === contactId);
      return contact;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function removeContact(contactId) {
  return listContacts()
    .then((contacts) => {
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      return fs
        .writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
        .then(() => updatedContacts);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function addContact(name, email, phone) {
  return listContacts()
    .then((contacts) => {
      const newContact = { id: uuidv4(), name, email, phone };
      contacts.push(newContact);
      return fs
        .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        .then(() => newContact);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
