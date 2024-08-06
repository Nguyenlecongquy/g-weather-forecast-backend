import express, {Request, Response} from "express";
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});