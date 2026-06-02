const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../logs/logger');
const { orderConfirmation, orderStatusUpdate, passwordReset } = require('../utils/emailTemplates');

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  if (env.SMTP_HOST && env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
    await transporter.verify();
    logger.info(`Email transporter ready (${env.SMTP_HOST})`);
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    logger.info(`Email transporter usando Ethereal: ${testAccount.user}`);
  }

  return transporter;
};

const sendOrderConfirmation = async (to, order) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: `Pedido #${order._id} confirmado - SonTerry`,
      html: orderConfirmation(order),
    });
    if (info.messageId && info.messageId.includes('ethereal')) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    logger.info(`Email de confirmación enviado a ${to} para orden ${order._id}`);
    return info;
  } catch (error) {
    logger.error(`Error enviando email a ${to}: ${error.message}`);
  }
};

const sendOrderStatusUpdate = async (to, order, previousStatus) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: `Estado de pedido #${order._id} actualizado - SonTerry`,
      html: orderStatusUpdate(order, previousStatus),
    });
    if (info.messageId && info.messageId.includes('ethereal')) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    logger.info(`Email de estado enviado a ${to} para orden ${order._id}: ${order.status}`);
    return info;
  } catch (error) {
    logger.error(`Error enviando email a ${to}: ${error.message}`);
  }
};

const sendPasswordReset = async (to, resetURL) => {
  try {
    const t = await getTransporter();
    const info = await t.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: 'Recuperación de contraseña - SonTerry',
      html: passwordReset(resetURL),
    });
    if (info.messageId && info.messageId.includes('ethereal')) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    logger.info(`Email de recuperación enviado a ${to}`);
    return info;
  } catch (error) {
    logger.error(`Error enviando email de recuperación a ${to}: ${error.message}`);
  }
};

module.exports = { sendOrderConfirmation, sendOrderStatusUpdate, sendPasswordReset };
