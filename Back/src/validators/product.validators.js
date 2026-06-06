const { z } = require('zod');
const mongoose = require('mongoose');

const urlRegex = /^https?:\/\/.+/;
const validTypes = ['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado'];

const createProductSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }).max(200, { message: "Máximo 200 caracteres" }),
  description: z.string().min(1, { message: "La descripción es requerida" }).max(5000, { message: "Máximo 5000 caracteres" }),
  price: z.coerce.number().min(0, { message: "El precio debe ser un número positivo" }),
  stock: z.coerce.number().int().min(0, { message: "El stock debe ser un entero positivo" }),
  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), { message: "La categoría debe ser un ID válido" }),
  type: z.string().refine((val) => validTypes.includes(val), { message: "Tipo inválido" }).optional(),
  images: z.array(z.string().regex(urlRegex, { message: "Cada imagen debe ser una URL válida (http/https)" })).optional(),
});

const updateProductSchema = z.object({
  name: z.string().max(200, { message: "Máximo 200 caracteres" }).optional(),
  description: z.string().max(5000, { message: "Máximo 5000 caracteres" }).optional(),
  price: z.coerce.number().min(0, { message: "Precio inválido" }).optional(),
  stock: z.coerce.number().int().min(0, { message: "Stock inválido" }).optional(),
  type: z.string().refine((val) => validTypes.includes(val), { message: "Tipo inválido" }).optional(),
  images: z.array(z.string().regex(urlRegex, { message: "Cada imagen debe ser una URL válida" })).optional(),
});

module.exports = { createProductSchema, updateProductSchema };
