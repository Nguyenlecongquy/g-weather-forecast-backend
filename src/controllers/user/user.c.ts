import { Express, Request, Response, NextFunction } from "express";
import {
  getAllUserRegister,
  insertUser,
  getCityUser,
} from "../../models/user/user.m";

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const users = await getAllUserRegister();
  if (!users) {
    res
      .status(404)
      .json({ message: "connect database and get information fail." });
    return;
  }
  res.json({ listEmail: users });
};

const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, accept } = req.body;
  const result = await insertUser(email, accept);
  if (!result) {
    res
      .status(404)
      .json({ message: "connect database and insert information fail." });
    return;
  }
  res.json({ message: "insert user success." });
};

const getCity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.query;
  const city = await getCityUser(String(email));
  if (!city) {
    res.status(404).json({ message: "get city fail" });
    return;
  }
  res.json({ city: city });
};

export { getUser, addUser, getCity };
