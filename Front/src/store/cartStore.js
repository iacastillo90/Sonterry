import { create } from 'zustand';
import api from '../services/api';

const isAuth = () => !!localStorage.getItem('st_token');

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('st_cart')) || [],

  fetchCart: async () => {
    if (!isAuth()) return;
    try {
      const response = await api.get('/cart');
      const backendItems = response.data.data.items || [];
      // Only replace local items if backend has data
      // This protects users with local items who aren't yet synced to backend
      if (backendItems.length > 0) {
        localStorage.setItem('st_cart', JSON.stringify(backendItems));
        set({ items: backendItems });
      }
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
    }
  },

  addToCart: async (product, quantity = 1, customization = null) => {
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex(item => 
      item.product._id === product._id && 
      (!customization || item.customization?.type === customization.type)
    );

    let newItems;
    if (existingIndex > -1) {
      newItems = currentItems.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...currentItems, { product, quantity, customization }];
    }

    localStorage.setItem('st_cart', JSON.stringify(newItems));
    set({ items: newItems });

    if (isAuth()) {
      try {
        const response = await api.post('/cart', {
          productId: product._id,
          quantity,
          customization
        });
        const backendItems = response.data.data.items || [];
        localStorage.setItem('st_cart', JSON.stringify(backendItems));
        set({ items: backendItems });
      } catch (error) {
        console.error('Error syncing cart add with backend:', error);
      }
    }
  },

  removeFromCart: async (productId, customizationType = null) => {
    const currentItems = get().items;
    const matchedItem = currentItems.find(item => 
      item.product._id === productId && (!customizationType || item.customization?.type === customizationType)
    );

    const newItems = currentItems.filter(item => 
      !(item.product._id === productId && (!customizationType || item.customization?.type === customizationType))
    );
    localStorage.setItem('st_cart', JSON.stringify(newItems));
    set({ items: newItems });

    // Only DELETE from backend if item exists there (has _id)
    if (isAuth() && matchedItem?._id) {
      try {
        await api.delete(`/cart/${matchedItem._id}`);
      } catch (error) {
        console.error('Error syncing cart remove with backend:', error);
      }
    }
  },

  updateItemQuantity: async (productId, quantity, customizationType = null) => {
    if (quantity <= 0) {
      await get().removeFromCart(productId, customizationType);
      return;
    }

    const currentItems = get().items;
    const newItems = currentItems.map(item => 
      item.product._id === productId && (!customizationType || item.customization?.type === customizationType)
        ? { ...item, quantity }
        : item
    );
    localStorage.setItem('st_cart', JSON.stringify(newItems));
    set({ items: newItems });

    if (isAuth()) {
      try {
        const matchedItem = currentItems.find(item => 
          item.product._id === productId && (!customizationType || item.customization?.type === customizationType)
        );
        if (matchedItem && matchedItem._id) {
          await api.patch(`/cart/${matchedItem._id}`, { quantity });
        } else {
          await get().fetchCart();
        }
      } catch (error) {
        console.error('Error syncing cart quantity update with backend:', error);
      }
    }
  },

  clearCart: () => {
    localStorage.removeItem('st_cart');
    set({ items: [] });
  },

  clearCartBackend: async () => {
    if (!isAuth()) return;
    try {
      await api.delete('/cart');
      localStorage.removeItem('st_cart');
      set({ items: [] });
    } catch (error) {
      console.error('Error clearing cart on backend:', error);
    }
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));

