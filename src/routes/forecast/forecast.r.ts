import express from "express";
import { getInfor } from "../../controllers/forecast/forecast.c";

const forecastRouter = express.Router();

forecastRouter.get("/search", getInfor);
// Add more routes here

export default forecastRouter;
