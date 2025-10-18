import nodemailer from "nodemailer";
import { createVerificationEmailHtml } from "./createVerificationEmailHtml";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `${
    process.env.APP_URL
  }/user/verify-email?email=${encodeURIComponent(email)}&token=${token}`;

  const emailHtml = createVerificationEmailHtml(verificationLink);
  const mailOption = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: emailHtml,
    text: `Please verify your email using the following link: ${verificationLink}`,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log("Verification email sent to " + email);
  } catch (error) {
    console.error("Error sending verification email: ", error);
  }
};
