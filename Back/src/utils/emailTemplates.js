const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const orderItemsTable = (items) =>
  items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #eee">${item.name}</td>
      <td style="padding:12px;border-bottom:1px solid #eee">${item.quantity}</td>
      <td style="padding:12px;border-bottom:1px solid #eee">${formatCurrency(item.price)}</td>
      <td style="padding:12px;border-bottom:1px solid #eee">${formatCurrency(item.price * item.quantity)}</td>
    </tr>`,
    )
    .join('');

const orderConfirmation = (order) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">¡Pedido confirmado!</h2>
      <p style="color:#666">Gracias por tu compra. Tu pedido <strong>#${order._id}</strong> ha sido recibido y está siendo procesado.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0">
        <thead>
          <tr style="background:#f8f8f8">
            <th style="padding:12px;text-align:left">Producto</th>
            <th style="padding:12px;text-align:left">Cant</th>
            <th style="padding:12px;text-align:left">Precio</th>
            <th style="padding:12px;text-align:left">Subtotal</th>
          </tr>
        </thead>
        <tbody>${orderItemsTable(order.items)}</tbody>
      </table>
      <div style="text-align:right;font-size:18px;font-weight:bold;color:#3D3D3D;margin:16px 0">
        Total: ${formatCurrency(order.total)}
      </div>
      <div style="background:#f8f8f8;padding:16px;border-radius:8px;margin:24px 0">
        <h4 style="margin:0 0 8px;color:#3D3D3D">Dirección de envío</h4>
        <p style="margin:0;color:#666">${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
      </div>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

const orderStatusUpdate = (order, previousStatus) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">Tu pedido avanzó</h2>
      <p style="color:#666">El estado de tu pedido <strong>#${order._id}</strong> cambió de <strong>${previousStatus}</strong> a <strong>${order.status}</strong>.</p>
      <div style="text-align:center;margin:32px 0">
        <span style="display:inline-block;padding:12px 32px;background:#D4A373;color:#fff;border-radius:6px;font-size:18px;font-weight:bold;text-transform:uppercase">${order.status}</span>
      </div>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

const passwordReset = (resetURL) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">Recupera tu contraseña</h2>
      <p style="color:#666">Recibiste este correo porque solicitaste restablecer tu contraseña. Haz clic en el botón para crear una nueva:</p>
      <div style="text-align:center;margin:32px 0">
        <a href="${resetURL}" style="display:inline-block;padding:14px 36px;background:#D4A373;color:#fff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold">Restablecer contraseña</a>
      </div>
      <p style="color:#999;font-size:13px">Este enlace expira en 1 hora. Si no solicitaste este cambio, ignora este mensaje.</p>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

const quoteRequestAdmin = (quote) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry - Nueva Cotización</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">Solicitud de Cotización</h2>
      <p style="color:#666">El cliente <strong>${quote.name}</strong> ha solicitado una nueva cotización.</p>
      
      <div style="background:#f8f8f8;padding:16px;border-radius:8px;margin:24px 0">
        <h4 style="margin:0 0 8px;color:#3D3D3D">Datos de contacto</h4>
        <p style="margin:2px 0;color:#666"><strong>Nombre:</strong> ${quote.name}</p>
        <p style="margin:2px 0;color:#666"><strong>Email:</strong> ${quote.email}</p>
        <p style="margin:2px 0;color:#666"><strong>Teléfono / WhatsApp:</strong> ${quote.phone}</p>
      </div>

      <div style="background:#f8f8f8;padding:16px;border-radius:8px;margin:24px 0">
        <h4 style="margin:0 0 8px;color:#3D3D3D">Detalles del proyecto</h4>
        <p style="margin:0;color:#666">${quote.details}</p>
      </div>

      ${quote.images && quote.images.length > 0 ? `
      <div style="background:#f8f8f8;padding:16px;border-radius:8px;margin:24px 0">
        <h4 style="margin:0 0 8px;color:#3D3D3D">Imágenes Adjuntas</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${quote.images.map(img => `<a href="${img}" target="_blank"><img src="${img}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc;"/></a>`).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`;

const quoteRequestUser = (quote) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:#3D3D3D;padding:24px;text-align:center">
      <h1 style="color:#D4A373;margin:0;font-size:24px">SonTerry Accesorios</h1>
    </div>
    <div style="padding:32px">
      <h2 style="color:#3D3D3D;margin:0 0 16px">¡Cotización Recibida!</h2>
      <p style="color:#666">Hola <strong>${quote.name}</strong>,</p>
      <p style="color:#666">Hemos recibido correctamente tu solicitud de cotización para tu proyecto personalizado. Nuestro equipo lo está revisando y nos pondremos en contacto contigo lo más pronto posible a través de tu WhatsApp (${quote.phone}) o a tu correo.</p>
      
      <div style="background:#f8f8f8;padding:16px;border-radius:8px;margin:24px 0">
        <h4 style="margin:0 0 8px;color:#3D3D3D">Detalles de lo que nos enviaste:</h4>
        <p style="margin:0;color:#666">${quote.details}</p>
      </div>

      <p style="color:#666">¡Gracias por confiar en nosotros!</p>
    </div>
    <div style="background:#3D3D3D;padding:16px;text-align:center;color:#999;font-size:12px">
      <p style="margin:0">SonTerry Accesorios — Personalización textil</p>
    </div>
  </div>
</body>
</html>`;

module.exports = { orderConfirmation, orderStatusUpdate, passwordReset, quoteRequestAdmin, quoteRequestUser };
