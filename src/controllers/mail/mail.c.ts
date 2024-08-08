import { Express, Request, Response, NextFunction } from "express";
import { updateUser } from "../../models/user/user.m";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmailConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const contain = `
    <h1> CQueue7 - Weather Forecast Center </h1>
    <p> Please confirm your email to receive daily weather forecast information </p>
    <a href="${process.env.HOST_BACKEND}/v1/email/verify-email?email=${email}"> Click here to confirm your email </a>
    <p> Thank you! </p>
`;
  const mailOptions = {
    from: process.env.EMAIL_SOURCE,
    to: email,
    subject: "Email confirmation",
    html: contain,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  res.json({ message: `send email confirmation success` });
};

const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = String(req.query.email);
  const result = await updateUser(email, true);
  if (!result) {
    res
      .status(404)
      .json({ message: "connect database and insert information fail." });
    return;
  }
  res.json({ message: "verify email success" });
};

const unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = String(req.query.email);
  const result = await updateUser(email, false);
  if (!result) {
    res
      .status(404)
      .json({ message: "connect database and insert information fail." });
    return;
  }
  res.json({ message: "unsubscribe success" });
};

export { sendEmailConfirmation, verifyEmail, unsubscribe };
