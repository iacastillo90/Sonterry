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

const { sendTicketReplyToUser, sendTicketReplyToAdmin } = require('./email.service');
const { uploadToMinio } = require('../utils/minioUpload');

const replyToTicket = async (id, sender, content, statusUpdate, user, file) => {
  const ticket = await Ticket.findById(id).populate('user');
  if (!ticket) throw new AppError('Ticket no encontrado', 404);

  // BOLA prevention: users can only reply to their own tickets
  if (sender !== 'admin' && ticket.user._id.toString() !== user._id.toString()) {
    throw new AppError('No tienes permiso para responder este ticket', 403);
  }

  let attachmentUrl = null;
  if (file) {
    attachmentUrl = await uploadToMinio(file.buffer, file.originalname, file.mimetype, 'tickets');
  }

  ticket.messages.push({
    sender,
    content,
    attachment: attachmentUrl,
    createdAt: new Date()
  });

  if (statusUpdate) {
    ticket.status = statusUpdate;
  } else if (sender === 'user' && ticket.status === 'resolved') {
    ticket.status = 'open';
  }

  await ticket.save();

  // Enviar correos y notificaciones
  if (sender === 'admin') {
    // Notificar al usuario (Email)
    sendTicketReplyToUser(ticket.user.email, ticket, content).catch(err => logger.error(`[Tickets] Email al usuario falló: ${err.message}`));
  } else {
    // Notificar al admin (Email y Dashboard)
    sendTicketReplyToAdmin(ticket, content, user).catch(err => logger.error(`[Tickets] Email al admin falló: ${err.message}`));
    
    addNotificationJob({
      ticketId: ticket._id,
      type: 'TICKET_REPLY',
      subject: `Respuesta en: ${ticket.subject}`,
      customerName: user.name || 'Cliente',
      ticketType: ticket.type
    }).catch(err => logger.error(`[Tickets] Notification job falló: ${err.message}`));
  }

  return ticket;
};

const deleteTicket = async (id) => {
  const ticket = await Ticket.findByIdAndDelete(id);
  if (!ticket) throw new AppError('Ticket no encontrado', 404);
  return ticket;
};

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus, replyToTicket, deleteTicket };
