const Contact = require('../models/contact.model');
const AppError = require('../errors/AppError');

const createContactMessage = async (contactData) => {
  const contact = await Contact.create(contactData);
  return { id: contact._id, createdAt: contact.createdAt };
};

module.exports = { createContactMessage };
