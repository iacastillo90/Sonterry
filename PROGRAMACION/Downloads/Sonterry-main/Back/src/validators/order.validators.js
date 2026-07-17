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

const updateOrderItemsSchema = z.object({
  items: z.array(z.object({
    product: z.string().min(1, { message: "El ID del producto es requerido" }),
    quantity: z.number().int().min(1, { message: "La cantidad debe ser al menos 1" }),
    customization: z.object({
      type: z.enum(['serigrafia', 'dtf']).optional(),
      details: z.string().max(1000).optional(),
    }).optional(),
  })).min(1, { message: "Debe haber al menos un producto en el pedido" }),
  paymentMethod: z.string().refine((val) => paymentMethods.includes(val), {
    message: "Método de pago inválido",
  }).optional(),
});

const updateOrderShippingSchema = z.object({
  shippingAddress: z.object({
    address: z.string().min(1, { message: "La dirección es requerida" }),
    city: z.string().min(1, { message: "La ciudad es requerida" }),
    postalCode: z.string().min(1, { message: "El código postal es requerido" }),
    country: z.string().min(1, { message: "El país es requerido" }),
    phone: z.string().min(1, { message: "El teléfono es requerido" }).regex(/^[0-9+\s\-()]{7,20}$/, { message: "Formato de teléfono inválido" }),
  }),
});

module.exports = { createOrderSchema, updateOrderStatusSchema, updateOrderItemsSchema, updateOrderShippingSchema };
