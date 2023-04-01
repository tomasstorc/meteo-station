import mongoose from "mongoose";
import IData from "../interface/Data";
import Data from "../model/Data";
import logger from "./logger";

export default function dbSeed(): void {
  for (let i = 0; i < 10; i++) {
    let data = new Data<IData>({
      deviceid: "63f8a7e595e3bfcac43e1bc6",
      timestamp: new Date(Date.now() - 300000 * i).getTime(),
      temperature: 25 - i,
      humidity: 24 - i,
    });
    data.save();
  }
  logger.info("db seeded");
}
