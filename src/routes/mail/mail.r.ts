import express from "express";
import {
  sendEmailConfirmation,
  sendEmailUnsubscribe,
  verifyEmail,
  unsubscribe,
} from "../../controllers/mail/mail.c";

const mailRouter = express.Router();

mailRouter.post("/send-email-confirmation", sendEmailConfirmation);
mailRouter.post("/send-email-unsubscribe", sendEmailUnsubscribe);
mailRouter.get("/verify-email", verifyEmail);
mailRouter.post("/unsubscribe", unsubscribe);
// Add more routes here

export default mailRouter;
