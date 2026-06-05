const { z } = require('zod');
const mongoose = require('mongoose');

const addReviewSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), { message: "ID de producto inválido" }),
  rating: z.coerce.number().int().min(1, { message: "El rating debe ser entre 1 y 5" }).max(5, { message: "El rating debe ser entre 1 y 5" }),
  comment: z.string().min(1, { message: "El comentario es requerido" }).max(2000, { message: "Máximo 2000 caracteres" }),
});

module.exports = { addReviewSchema };
