import express from "express";
import { getUser, addUser } from "../../controllers/user/user.c";

const userRouter = express.Router();

userRouter.get("/search", getUser);
userRouter.post("/add", addUser);
// Add more routes here

export default userRouter;
