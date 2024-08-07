import { Express, Request, Response, NextFunction } from "express";
import { getWeatherForecast } from "../../config/axios";

const getInfor = (req: Request, res: Response, next: NextFunction): void => {
  const city = req.query.city as string;
  const days = req.query.days as string;
  let daysInt: number = 5;
  if (!city) {
    res.json({ error: { message: "City is required" } });
    return;
  }
  if (days && isNaN(parseInt(days))) {
    res.json({ error: { message: "Days should be a number" } });
    return;
  }
  if (days) {
    let temp = parseInt(days);
    if (temp < 1 || temp > 14) {
      res.json({ error: { message: "Days should be between 1 and 14" } });
      return;
    }
    daysInt = temp;
  }
  try {
    getWeatherForecast(city, daysInt).then((response) => {
      res.json(response);
    });
  } catch (error: any) {
    next(error);
  }
};

export { getInfor };
