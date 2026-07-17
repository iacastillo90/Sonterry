const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');
const { uploadMultipleToMinio } = require('../utils/minioUpload');
const emailService = require('../services/email.service');

const createQuote = catchAsync(async (req, res) => {
  const { name, email, phone, details } = req.body;
  const files = req.files || [];

  let imageUrls = [];
  if (files.length > 0) {
    imageUrls = await uploadMultipleToMinio(files);
  }

  const quoteData = {
    name,
    email,
    phone,
    details,
    images: imageUrls,
  };

  // Send emails
  await emailService.sendQuoteEmails(quoteData);

  res.status(200).json(formatResponse(true, 'Cotización enviada exitosamente', null));
});

module.exports = { createQuote };
