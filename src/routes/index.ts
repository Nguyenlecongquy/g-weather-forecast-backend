import { Express } from "express";
import forecastRouter from "./forecast/forecast.r";
import userRouter from "./user/user.r";

const routes = (app: Express) => {
  app.use("/v1/weather-forecast", forecastRouter);
  app.use("/v1/user", userRouter);
  // Add more routes here
};

export default routes;
