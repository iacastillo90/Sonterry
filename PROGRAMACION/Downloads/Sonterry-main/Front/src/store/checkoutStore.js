import { create } from 'zustand';

export const useCheckoutStore = create((set) => ({
  shippingAddress: JSON.parse(sessionStorage.getItem('st_shipping')) || {
    address: '',
    city: '',
    postalCode: '',
    country: 'Colombia',
    phone: ''
  },
  paymentMethod: 'stripe',

  setShippingAddress: (address) => {
    sessionStorage.setItem('st_shipping', JSON.stringify(address));
    set({ shippingAddress: address });
  },

  setPaymentMethod: (method) => {
    set({ paymentMethod: method });
  }
}));
