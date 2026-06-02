import api from './api';

export const createTicket = async (ticketData) => {
  const res = await api.post('/tickets', ticketData);
  return res.data.data;
};

export const fetchUserTickets = async () => {
  const res = await api.get('/tickets');
  return res.data.data;
};

export const fetchAllTicketsAdmin = async () => {
  const res = await api.get('/tickets/all');
  return res.data.data;
};

export const updateTicketStatusAdmin = async (id, status) => {
  const res = await api.patch(`/tickets/${id}/status`, { status });
  return res.data.data;
};
