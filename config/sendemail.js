import dotenv from 'dotenv'
dotenv.config()
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER, 
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

 const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
export default sendEmail  
