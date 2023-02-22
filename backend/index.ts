import express, { Express, Request, Response } from "express";
import userController from "./controller/user-controller";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/user", userController);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
