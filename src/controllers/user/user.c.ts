import { Express, Request, Response, NextFunction } from "express";
import { getAllUserRegister } from "../../models/user/user.m";

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const users = await getAllUserRegister();
  if (!users) {
    res.status(404).json({ message: "connect database and get information fail." });
    return;
  }
  res.json({ listEmail: users });
};

export { getUser };
