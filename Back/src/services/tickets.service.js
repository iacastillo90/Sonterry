const Ticket = require('../models/ticket.model');
const AppError = require('../errors/AppError');
const { addNotificationJob } = require('../jobs/notificationQueue');
const logger = require('../logs/logger');

const createTicket = async (userId, ticketData, userName) => {
  const ticket = await Ticket.create({
    user: userId,
    ...ticketData
  });

  // Enqueue notification for admin (Fire-and-forget)
  addNotificationJob({
    ticketId: ticket._id,
    type: 'TICKET_CREATED',
    subject: ticket.subject,
    customerName: userName || 'Cliente',
    ticketType: ticket.type
  }).catch(err => logger.error(`[Tickets] Failed to enqueue ticket notification: ${err.message}`));

  return ticket;
};

const getUserTickets = async (userId) => {
  return await Ticket.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllTickets = async () => {
  return await Ticket.find().populate('user', 'name email').sort({ createdAt: -1 });
};

const updateTicketStatus = async (id, status) => {
  const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
  if (!ticket) throw new AppError('Ticket no encontrado', 404);
  return ticket;
};

const replyToTicket = async (id, sender, content, statusUpdate, user) => {
  const ticket = await Ticket.findById(id).populate('user');
  if (!ticket) throw new AppError('Ticket no encontrado', 404);

  // BOLA prevention: users can only reply to their own tickets
  if (sender !== 'admin' && ticket.user._id.toString() !== user._id.toString()) {
    throw new AppError('No tienes permiso para responder este ticket', 403);
  }

  ticket.messages.push({
    sender,
    content,
    createdAt: new Date()
  });

  if (statusUpdate) {
    ticket.status = statusUpdate;
  } else if (sender === 'user' && ticket.status === 'resolved') {
    ticket.status = 'open';
  }

  await ticket.save();
  return ticket;
};

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus, replyToTicket };
