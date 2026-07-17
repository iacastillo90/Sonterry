import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema } from '../../../schemas/checkoutSchema';
import { useCheckoutStore } from '../../../store/checkoutStore';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const ShippingForm = ({ onNext }) => {
  const { shippingAddress, setShippingAddress } = useCheckoutStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingAddress
  });

  const onSubmit = (data) => {
    setShippingAddress(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
      <Input label="Dirección de Envío / Taller de Despacho" name="address" register={register} error={errors.address} />
      <div className="shipping-form-row">
        <Input label="Ciudad" name="city" register={register} error={errors.city} />
        <Input label="Código Postal" name="postalCode" register={register} error={errors.postalCode} />
      </div>
      <Input label="País" name="country" register={register} error={errors.country} />
      <Input label="Teléfono (Para notificaciones de WhatsApp)" name="phone" register={register} error={errors.phone} placeholder="Ej: +573018267373" />
      
      <Button type="submit" variant="primary" style={{ marginTop: '1.5rem' }}>
        Continuar al Pago
      </Button>
    </form>
  );
};

export default ShippingForm;
