import express, { Request, Response } from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import SuccessResponse from "../response/success-response";
import Data from "../model/Data";
import IData from "../interface/Data";
import isDeviceAuthenticated from "../middleware/isDeviceAuth";
import { CallbackError, Document } from "mongoose";
import ErrorResponse from "../response/error-response";
import isOwnerOrUser from "../middleware/isOwnerOrUser";

const router = express.Router();

router.get(
  "/:id",
  isAuthenticated,
  isOwnerOrUser,
  (req: Request, res: Response) => {
    Data.find(
      {
        deviceid: req.params.id,
        timestamp: {
          $lte: Date.now(),
          $gte: new Date(Date.now() - 1000 * (60 * 5)),
        },
      },
      (err: CallbackError | undefined, foundData: Document<IData>) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        if (!foundData)
          return res.status(200).json(new SuccessResponse("No data found"));
        return res
          .status(200)
          .json(new SuccessResponse("ok", { data: foundData }));
      }
    );
  }
);

router.post("/", isDeviceAuthenticated, (req: Request, res: Response) => {
  let newData = new Data<IData>({
    deviceid: req.body.deviceid,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    timestamp: Date.now(),
  });
  newData.save((err: CallbackError | undefined, savedData: IData) => {
    if (err) return res.status(400).json(new ErrorResponse(err));
    if (!savedData) res.status(400).json(new ErrorResponse("data not saved"));
    return res.sendStatus(201);
  });
});

export default router;
