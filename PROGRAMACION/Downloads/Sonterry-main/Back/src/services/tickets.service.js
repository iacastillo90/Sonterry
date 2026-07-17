const Ticket = require('../models/ticket.model');
const AppError = require('../errors/AppError');
const { addNotificationJob } = require('../jobs/notificationQueue');
const notificationsService = require('./notifications.service');
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

  // In-app notification for admin
  notificationsService.createNotification({
    targetRole: 'admin',
    title: 'Nuevo Ticket',
    message: `${userName || 'Cliente'} ha abierto un ticket: ${ticket.subject}.`,
    link: '/admin',
  }).catch(err => logger.error(`[Notifications] Failed to create in-app notification: ${err.message}`));

  return ticket;
};

const getUserTickets = async (userId) => {
  return await Ticket.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllTickets = async () => {
  return await Ticket.find().populate('user', 'name email').sort({ createdAt: -1 });
};

const updateTicketStatus = async (id, status) => {
  const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true }).populate('user');
  if (!ticket) throw new AppError('Ticket no encontrado', 404);

  notificationsService.createNotification({
    user: ticket.user._id,
    targetRole: 'client',
    title: 'Actualización de Ticket',
    message: `Tu ticket "${ticket.subject}" ha cambiado de estado a: ${status}.`,
    link: '/profile',
  }).catch(err => logger.error(`[Notifications] Failed to create in-app notification: ${err.message}`));

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
    
    // In-app notification to client
    notificationsService.createNotification({
      user: ticket.user._id,
      targetRole: 'client',
      title: 'Respuesta en Ticket',
      message: `El soporte respondió a tu ticket: ${ticket.subject}.`,
      link: '/profile',
    }).catch(err => logger.error(`[Notifications] Failed to create in-app notification: ${err.message}`));

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

    // In-app notification to admin
    notificationsService.createNotification({
      targetRole: 'admin',
      title: 'Respuesta en Ticket',
      message: `${user.name || 'Cliente'} respondió al ticket: ${ticket.subject}.`,
      link: '/admin',
    }).catch(err => logger.error(`[Notifications] Failed to create in-app notification: ${err.message}`));
  }

  return ticket;
};

const deleteTicket = async (id) => {
  const ticket = await Ticket.findByIdAndDelete(id);
  if (!ticket) throw new AppError('Ticket no encontrado', 404);
  return ticket;
};

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus, replyToTicket, deleteTicket };
