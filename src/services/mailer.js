import nodemailer from "nodemailer";
import ApplicationError from "../middleware/applicationError.middleware.js";

export const sendOTPMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASS_USER
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new ApplicationError(error.message, 500);
  }
};
