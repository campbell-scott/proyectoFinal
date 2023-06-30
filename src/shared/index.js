import dotenv from "dotenv";
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

export const createHash = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) => {
  return await jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '5m' });
}

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
      from: 'process.env.EMAIL_USERNAME',
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
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};