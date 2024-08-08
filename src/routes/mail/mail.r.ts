import express from "express";
import { sendEmailConfirmation, verifyEmail, unsubscribe } from "../../controllers/mail/mail.c";

const mailRouter = express.Router();

mailRouter.post("/send-email-confirmation", sendEmailConfirmation);
mailRouter.get("/verify-email", verifyEmail);
mailRouter.get("/unsubscribe", unsubscribe);
// Add more routes here

export default mailRouter;
