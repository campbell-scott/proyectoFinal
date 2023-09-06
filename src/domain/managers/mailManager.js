import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer"
import logger from '../../utils/pino.js'

export const generateTicketMail = async (ticket) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_KEY,
      },
    });

    const mail = {
      from: `${process.env.EMAIL_USERNAME}`,
      to:  `${ticket.purchaser}`,
      subject: 'Ticket de compra',
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #f00;">Ticket de compra</h1>
        <p><strong>Comprador:</strong> ${ticket.purchaser}</p>
        <p><strong>Importe total:</strong> ${ticket.amount}</p>
        <h2>Detalles del ticket:</h2>
        <ul style="list-style: none; padding: 0;">
          <li>
            <strong>ID del ticket:</strong> ${ticket._id}
          </li>
          <li>
            <strong>Fecha y hora de compra:</strong> ${ticket.purchaseDateTime}
          </li>
          <li>
            <strong>Productos:</strong>
            <ul style="list-style: none; padding: 0;">
              ${ticket.products.map((product) => `
                <li>
                  <strong>ID del producto:</strong> ${product._id}
                  <br>
                  <strong>Cantidad:</strong> ${product.quantity}
                </li>
              `).join('')}
            </ul>
          </li>
        </ul>
      </div>`,
      attachments: [],
    };

    const info = await transport.sendMail(mail);
    logger.info('Correo electrónico enviado:', info.response);
  } catch (error) {
    logger.info('Error al enviar el correo electrónico:', error);
  }
};

export const forgetPasswordMail = async (email, firstName, token, url) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_KEY,
      },
    });

    const mail = {
      from: `${process.env.EMAIL_USERNAME}`,
      to:  `${email}`,
      subject: 'Cambio de contraseña',
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #f00; margin-bottom: 10px;">¡Hola ${firstName}!</h1>
        <p style="font-size: 16px;"><strong>Se solicitó un cambio de contraseña para su cuenta. Si no realizó esta solicitud, puede ignorar este correo electrónico.</strong></p>
        <h2 style="color: #333; font-size: 20px;">Para cambiar su contraseña, haga clic en el siguiente enlace y complete el formulario:</h2>
        <p style="font-size: 16px; margin-top: 10px;"><a href="${url}/api/sessions/reset-password?token=${token}" style="color: #007bff; text-decoration: none;">Cambiar Contraseña</a></p>
      </div>
      <p style="font-size: 14px; color: #666; margin-top: 20px;">Si tiene alguna pregunta o necesita ayuda, no dude en contactarnos.</p>
    </div>`,
      attachments: [],
    };

    const info = await transport.sendMail(mail);
    logger.info('Correo forgotPassword electrónico enviado:', info.response);
  } catch (error) {
    logger.info('Error al enviar el correo electrónico:', error);
  }
};