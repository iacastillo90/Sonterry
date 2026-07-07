import React from 'react';
import { MessageCircle, CreditCard, Bike, PackageCheck } from 'lucide-react';
import politicasImg from '../../assets/img/politicas-envio.png';
import SpHero from './components/SpHero';
import SpStepCard from './components/SpStepCard';
import SpNote from './components/SpNote';
import './ShippingPolicy.css';

const STEPS = [
  {
    icon: MessageCircle,
    color: '#25D366',
    bg: '#E8FAF0',
    title: 'Reserva tu producto',
    desc: 'Si te gustó un producto de nuestra página, envíanos un mensaje y lo reservaremos para ti.',
  },
  {
    icon: CreditCard,
    color: '#6DBF47',
    bg: '#EEF8E8',
    title: 'Verifica la consignación',
    desc: 'Verificamos la consignación que realices a las cuentas autorizadas.',
  },
  {
    icon: Bike,
    color: '#C97D5C',
    bg: '#FBF0EA',
    title: 'Envío con mensajería',
    desc: 'Se hará el envío con una empresa de mensajería y domiciliarios. Ten en cuenta que debes hacerte cargo de pagar el valor del domicilio.',
  },
  {
    icon: PackageCheck,
    color: '#528F58',
    bg: '#EAF4EC',
    title: '¡Recibe tu pedido!',
    desc: 'Recibirás tu producto con el amor y la dedicación que pone SonTerry en cada pieza.',
  },
];

const ShippingPolicy = () => (
  <div className="sp-page">
    <SpHero />

    <div className="sp-body">
      {/* Imagen */}
      <div className="sp-img-wrap">
        <img src={politicasImg} alt="Políticas de envío SonTerry" />
      </div>

      {/* Pasos */}
      <div>
        <div className="sp-steps-header">
          <span className="sp-steps-tag">¿Cómo funciona?</span>
          <h2 className="sp-steps-title">Tu pedido en 4 pasos</h2>
          <p className="sp-steps-sub">
            Desde que eliges tu producto hasta que llega a tus manos, te acompañamos en cada etapa.
          </p>
        </div>

        <div className="sp-steps">
          {STEPS.map((step, i) => (
            <SpStepCard key={step.title} step={step} index={i} />
          ))}
        </div>

        <SpNote />
      </div>
    </div>
  </div>
);

export default ShippingPolicy;
