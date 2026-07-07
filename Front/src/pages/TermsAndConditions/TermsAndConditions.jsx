import React from 'react';
import terminosImg from '../../assets/img/terminos-condiciones.png';
import TcHero from './components/TcHero';
import TcIntroBox from './components/TcIntroBox';
import TcSection from './components/TcSection';
import TcFooterNote from './components/TcFooterNote';
import './TermsAndConditions.css';

const SECTIONS = [
  {
    title: '1. Productos y disponibilidad',
    items: [
      'Las prendas mostradas pueden variar ligeramente en color debido a la iluminación de las fotos.',
      'Las tallas se basan en medidas estándar; se recomienda revisar la guía de tallas.',
      'La disponibilidad está sujeta a existencia en inventario.',
    ],
  },
  {
    title: '2. Precios y pagos',
    items: [
      'Los precios incluyen impuestos locales, pero no incluyen costos de envío; los cuales serán detallados al finalizar la compra.',
    ],
  },
  {
    title: '3. Métodos de pago aceptados',
    items: [
      'Efectivo y transferencia.',
    ],
  },
  {
    title: '4. Política de envío',
    items: [
      'Los envíos se realizan a través de empresas de mensajería y/o domiciliarios.',
      'Los tiempos estimados y costo de envío dependen directamente de la empresa de envíos y tu localización.',
      'Es responsabilidad del cliente brindar la información completa con la dirección correcta y con todos los datos que componen la dirección como casa, apartamento, unidad, bloque, barrio, ciudad.',
    ],
  },
  {
    title: '5. Cambios y devoluciones',
    items: [
      'Se aceptan cambios dentro de los 3 días siguientes a la recepción del envío.',
      'La prenda debe estar nueva, sin uso; con etiquetas originales y empaque en buen estado.',
      'No se aceptan cambios de prendas en promoción; salvo prendas con defectos de fábrica.',
      'El cliente asume los costos de envío por cambios, a menos que la causa de la devolución sea defecto de fábrica.',
    ],
  },
  {
    title: '6. Garantía de calidad',
    items: [
      'Nuestras prendas cumplen con la normatividad de composición y etiquetado.',
      'La garantía cubre defectos de costura o materiales por 20 días luego de la recepción del producto.',
      'La garantía no cubre mal uso o lavado incorrecto de la prenda.',
    ],
  },
  {
    title: '7. Instrucciones de cuidado',
    items: [
      'Se recomienda seguir las instrucciones en la etiqueta interna del producto, para garantizar la durabilidad de la prenda.',
    ],
  },
  {
    title: '8. Legislación aplicable',
    items: [
      'Estos términos se rigen por las leyes de Colombia.',
    ],
  },
];

const TermsAndConditions = () => (
  <div className="tc-page">
    <TcHero />

    <div className="tc-body">
      {/* Imagen */}
      <div className="tc-img-wrap">
        <img src={terminosImg} alt="Términos y condiciones SonTerry" />
      </div>

      {/* Contenido */}
      <div className="tc-content">
        <TcIntroBox />

        {SECTIONS.map((section) => (
          <TcSection key={section.title} {...section} />
        ))}

        <TcFooterNote />
      </div>
    </div>
  </div>
);

export default TermsAndConditions;
