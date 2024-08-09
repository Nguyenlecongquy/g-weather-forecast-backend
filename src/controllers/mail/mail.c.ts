import { Express, Request, Response, NextFunction } from "express";
import {
  updateUser,
  getAllUserRegister,
  insertUser,
} from "../../models/user/user.m";
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
  const { email, city } = req.body;
  const contain = `
    <h1> CQueue7 - Weather Forecast Center </h1>
    <p> Please confirm your email to receive daily weather forecast information </p>
    <a href="${process.env.HOST_BACKEND}/v1/email/verify-email?email=${email}&city=${city}"> Click here to confirm your email </a>
    <p> Thank you! </p>
`;
  const mailOptions = {
    from: process.env.EMAIL_SOURCE,
    to: email,
    subject: "Email confirmation",
    html: contain,
  };
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    res.status(404).json({ message: "send email confirmation fail" });
    return;
  }
  res.json({ message: `send email confirmation success` });
};

const sendEmailUnsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const listEmail = await getAllUserRegister();
  if (!listEmail.find((item: any) => item.email === email)) {
    res.status(404).json({ message: "email is not registered" });
    return;
  }
  const contain = `
        <h1> CQueue7 - Weather Forecast Center </h1>
        <p> You have successfully unsubscribed from receiving daily weather forecast information </p>
        <p> Thank you! </p>
    `;
  const mailOptions = {
    from: process.env.EMAIL_SOURCE,
    to: email,
    subject: "Unsubscribe",
    html: contain,
  };
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    res.status(404).json({ message: "send email unsubscribe fail" });
    return;
  }
  res.json({ message: `send email unsubscribe success` });
};

const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = String(req.query.email);
  const city: string = String(req.query.city);
  const listEmail = await getAllUserRegister();

  // If email is not in the list, create a new user
  if (!listEmail.find((item: any) => item.email === email)) {
    let result = await insertUser(email, true, city);
    if (!result) {
      res
        .status(404)
        .json({ message: "connect database and insert information fail." });
      return;
    }
    res.json({ message: "verify email success" });
  } else {
    let result = await updateUser(email, true, city);

    if (!result) {
      res
        .status(404)
        .json({ message: "connect database and insert information fail." });
      return;
    }
    res.json({ message: "verify email success" });
  }
};

const unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const listEmail = await getAllUserRegister();
  if (!listEmail.find((item: any) => item.email === email)) {
    res.status(404).json({ message: "email is not registered" });
    return;
  }
  const result = await updateUser(email, false);
  if (!result) {
    res
      .status(404)
      .json({ message: "connect database and insert information fail." });
    return;
  }
  res.json({ message: "unsubscribe success" });
};

export {
  sendEmailConfirmation,
  sendEmailUnsubscribe,
  verifyEmail,
  unsubscribe,
};
