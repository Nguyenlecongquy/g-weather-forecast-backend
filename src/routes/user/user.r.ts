import express from "express";
import { getUser } from "../../controllers/user/user.c";

const userRouter = express.Router();

userRouter.get("/search", getUser);
// Add more routes here

export default userRouter;
