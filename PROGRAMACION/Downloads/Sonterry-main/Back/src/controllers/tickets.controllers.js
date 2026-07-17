const ticketsService = require('../services/tickets.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createTicket = catchAsync(async (req, res) => {
  const ticket = await ticketsService.createTicket(req.user._id, req.body, req.user.name);
  res.status(201).json(formatResponse(true, 'Ticket de soporte creado con éxito', ticket));
});

const getUserTickets = catchAsync(async (req, res) => {
  const tickets = await ticketsService.getUserTickets(req.user._id);
  res.status(200).json(formatResponse(true, 'Mis tickets de soporte', tickets));
});

const getAllTickets = catchAsync(async (req, res) => {
  const tickets = await ticketsService.getAllTickets();
  res.status(200).json(formatResponse(true, 'Tickets de soporte (Admin)', tickets));
});

const updateTicketStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = await ticketsService.updateTicketStatus(id, status);
  res.status(200).json(formatResponse(true, 'Estado del ticket actualizado', ticket));
});

const replyToTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { content, statusUpdate } = req.body;
  const sender = req.user.role === 'admin' ? 'admin' : 'user';

  const ticket = await ticketsService.replyToTicket(id, sender, content, statusUpdate, req.user, req.file);
  res.status(201).json(formatResponse(true, 'Respuesta enviada', ticket));
});

const deleteTicket = catchAsync(async (req, res) => {
  await ticketsService.deleteTicket(req.params.id);
  res.status(200).json(formatResponse(true, 'Ticket eliminado con éxito', null));
});

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus, replyToTicket, deleteTicket };
