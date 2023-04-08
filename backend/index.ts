import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import dbConnect from "./utils/db-connect";
import morganMiddleware from "./middleware/morgan";
import logger from "./utils/logger";

import userController from "./controller/user-controller";
import dataController from "./controller/data-controller";
import authControlller from "./controller/auth-controller";
import deviceController from "./controller/device-controller";
import keyController from "./controller/key-controller";
import dbSeed from "./utils/db-seed";

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userController);
app.use("/api/data", dataController);
app.use("/api/device", deviceController);
app.use("/api/auth", authControlller);
app.use("/api/key", keyController);

dbConnect();
if (process.env.NODE_ENV !== "production") dbSeed();
app.listen(port, () => {
  logger.info(`server running at port ${port}`);
});
