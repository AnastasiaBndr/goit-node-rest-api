import nodemailer from "nodemailer";
import "dotenv/config";

const {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_USER,
  NODEMAILER_PASSWORD,
} = process.env;

const nodemailerConfig = {
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (payload) => {
  const email = { ...payload, from: NODEMAILER_USER };
  return transporter.sendMail(email);
};

export default sendEmail;
