const contactService = require('../services/contact.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createContact = catchAsync(async (req, res) => {
  const result = await contactService.createContactMessage(req.body);
  res.status(201).json(formatResponse(true, 'Mensaje recibido con éxito. Te responderemos en menos de 24 horas hábiles.', result));
});

module.exports = { createContact };
