import express from "express";
const forecastRouter = express.Router();

forecastRouter.get("/", (req, res) => {
  res.json({ message: "forecast" });
});

export default forecastRouter;
