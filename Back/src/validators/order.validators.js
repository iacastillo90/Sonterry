const { z } = require('zod');

const paymentMethods = ['tarjeta', 'efectivo', 'transferencia', 'deposito', 'wompi'];

const createOrderSchema = z.object({
  shippingAddress: z.object({
    address: z.string().min(1, { message: "La dirección es requerida" }),
    city: z.string().min(1, { message: "La ciudad es requerida" }),
    postalCode: z.string().min(1, { message: "El código postal es requerido" }),
    country: z.string().min(1, { message: "El país es requerido" }),
    phone: z.string().min(1, { message: "El teléfono es requerido" }).regex(/^[0-9+\s\-()]{7,20}$/, { message: "Formato de teléfono inválido" }),
  }),
  paymentMethod: z.string().refine((val) => paymentMethods.includes(val), {
    message: "Método de pago inválido",
  }).optional(),
});

const statusValues = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

const updateOrderStatusSchema = z.object({
  status: z.string().refine((val) => statusValues.includes(val), {
    message: "Estado de pedido inválido. Valores permitidos: pending, paid, shipped, delivered, cancelled",
  }),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
