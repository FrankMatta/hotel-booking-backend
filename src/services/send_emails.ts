import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { GuestDetails } from "../models/models";
dotenv.config();

export default async function sendGuestEmail({firstName, email}: GuestDetails) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.gmailUsername, // generated ethereal user
      pass: process.env.gmailAppPassword, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    to: email, // list of receivers
    subject: "Welcome to our list of guests! ✔", // Subject line
      text: `
        Hi ${firstName},

        We'd like to welcome you to our guest list at Hotel.co!
        We hope that you will enjoy your stay!

        Looking forward to seeing you soon.



        Best regards,
        Hotel.co team
      `
  });
  
    return info;
}