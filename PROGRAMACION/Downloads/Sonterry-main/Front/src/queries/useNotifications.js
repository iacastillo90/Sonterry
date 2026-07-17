import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useNotifications = (asAdmin = false) => {
  return useQuery({
    queryKey: ['notifications', asAdmin ? 'admin' : 'client'],
    queryFn: async () => {
      const res = await api.get(`/notifications?asAdmin=${asAdmin}`);
      return res.data.data; // { notifications, unreadCount }
    },
    refetchInterval: 60000, // Refetch every 60 seconds automatically
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, asAdmin }) => {
      await api.patch(`/notifications/${id}/read?asAdmin=${asAdmin}`);
    },
    onSuccess: (_, { asAdmin }) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', asAdmin ? 'admin' : 'client'] });
    }
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ asAdmin }) => {
      await api.patch(`/notifications/read-all?asAdmin=${asAdmin}`);
    },
    onSuccess: (_, { asAdmin }) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', asAdmin ? 'admin' : 'client'] });
    }
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, asAdmin }) => {
      await api.delete(`/notifications/${id}?asAdmin=${asAdmin}`);
    },
    onSuccess: (_, { asAdmin }) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', asAdmin ? 'admin' : 'client'] });
    }
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ asAdmin }) => {
      await api.delete(`/notifications/all?asAdmin=${asAdmin}`);
    },
    onSuccess: (_, { asAdmin }) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', asAdmin ? 'admin' : 'client'] });
    }
  });
};
