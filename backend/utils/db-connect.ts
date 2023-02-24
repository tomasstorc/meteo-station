import mongoose from "mongoose";
import logger from "./logger";

const dbConnect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      logger.info("connected to db");
    })
    .catch((e) => {
      logger.error(`there was an error connecting to db, reason ${e}`);
    });
};

export default dbConnect;
