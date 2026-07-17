import { create } from 'zustand';

export const useUiStore = create((set, get) => ({
  cartOpen: false,
  toasts: [],

  toggleCart: (open) => set((state) => ({ cartOpen: open !== undefined ? open : !state.cartOpen })),

  addToast: (message, type = 'success') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  }
}));
