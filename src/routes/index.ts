import { Express, Request, Response, NextFunction } from "express";
import currentRouter from "./current/current";
import forecastRouter from "./forecast/forecast";

const routes = (app: Express) => {
  app.use("/v1/weather-current", currentRouter);
  app.use("/v1/weather-forecast", forecastRouter);
};

export default routes;
