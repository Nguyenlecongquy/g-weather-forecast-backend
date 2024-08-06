import express, {Request, Response, NextFunction} from "express";
import * as dotenv from 'dotenv'
import routes from "./routes";
dotenv.config()

const app = express();

app.use(express.json());

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});