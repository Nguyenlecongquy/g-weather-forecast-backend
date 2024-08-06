import express from "express";
const currentRouter = express.Router();

currentRouter.get("/", (req, res) => {
  res.json({ message: "current" });
});
// other routes

export default currentRouter;
