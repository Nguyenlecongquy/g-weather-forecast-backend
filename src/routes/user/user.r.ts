import express from "express";
import { getUser, addUser, getCity } from "../../controllers/user/user.c";

const userRouter = express.Router();

userRouter.get("/search", getUser);
userRouter.post("/add", addUser);
userRouter.get("/get-city", getCity);
// Add more routes here

export default userRouter;
