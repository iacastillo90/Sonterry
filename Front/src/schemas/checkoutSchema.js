import { z } from 'zod';

export const shippingSchema = z.object({
  address: z.string().min(5, 'La dirección es obligatoria y debe ser detallada'),
  city: z.string().min(2, 'La ciudad es obligatoria'),
  postalCode: z.string().min(3, 'Código postal obligatorio'),
  country: z.string().min(2, 'País obligatorio'),
  phone: z.string().min(7, 'Ingresa un número telefónico de contacto válido')
});
