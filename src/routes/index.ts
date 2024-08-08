import { Express } from "express";
import forecastRouter from "./forecast/forecast.r";
import userRouter from "./user/user.r";
import mailRouter from "./mail/mail.r";

const routes = (app: Express) => {
  app.use("/v1/weather-forecast", forecastRouter);
  app.use("/v1/user", userRouter);
  app.use("/v1/email", mailRouter);
  // Add more routes here
};

export default routes;
