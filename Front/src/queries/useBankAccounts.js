import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useBankAccountsAdmin = () => {
  return useQuery({
    queryKey: ['adminBankAccounts'],
    queryFn: async () => {
      const { data } = await api.get('/bank-accounts/all');
      return data.data;
    }
  });
};

export const useBankAccountsPublic = () => {
  return useQuery({
    queryKey: ['publicBankAccounts'],
    queryFn: async () => {
      const { data } = await api.get('/bank-accounts');
      return data.data;
    }
  });
};

export const useCreateBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (accountData) => {
      const { data } = await api.post('/bank-accounts', accountData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBankAccounts'] });
    }
  });
};

export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...accountData }) => {
      const { data } = await api.put(`/bank-accounts/${id}`, accountData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBankAccounts'] });
    }
  });
};

export const useDeleteBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/bank-accounts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBankAccounts'] });
    }
  });
};
