import { Express } from "express";
import forecastRouter from "./forecast/forecast.r";

const routes = (app: Express) => {
  app.use("/v1/weather-forecast", forecastRouter);
  // Add more routes here
};

export default routes;
