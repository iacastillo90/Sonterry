import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ticketsService from '../services/tickets.service';

export const useUserTickets = () => {
  return useQuery({
    queryKey: ['userTickets'],
    queryFn: ticketsService.fetchUserTickets
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ticketsService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTickets'] });
    }
  });
};

export const useAdminTickets = () => {
  return useQuery({
    queryKey: ['adminTickets'],
    queryFn: ticketsService.fetchAllTicketsAdmin
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => ticketsService.updateTicketStatusAdmin(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTickets'] });
      queryClient.invalidateQueries({ queryKey: ['userTickets'] });
    }
  });
};

export const useReplyTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => ticketsService.replyToTicket(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTickets'] });
      queryClient.invalidateQueries({ queryKey: ['userTickets'] });
    }
  });
};
