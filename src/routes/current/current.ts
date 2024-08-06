import express, { NextFunction, Request, Response } from "express";
import { getWeatherCurrent } from "../../config/axios";
const currentRouter = express.Router();

currentRouter.get(
  "/",
  (req: Request<{ city: string }>, res: Response, next: NextFunction) => {
    const city = req.query.city as string;
    if (!city) {
      res.json({ error: { message: "City is required" } });
      return;
    }
    try {
      getWeatherCurrent(city).then((response) => {
        res.json(response);
      });
    } catch (error: any) {
      next(error);
    }
  }
);

export default currentRouter;
