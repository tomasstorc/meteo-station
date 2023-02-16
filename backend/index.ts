import express, { Express, Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
