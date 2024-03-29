import express, { Request, Response } from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import SuccessResponse from "../response/success-response";
import Data from "../model/Data";
import IData from "../interface/Data";
import isDeviceAuthenticated from "../middleware/isDeviceAuth";
import { CallbackError, Document } from "mongoose";
import ErrorResponse from "../response/error-response";
import isOwnerOrUser from "../middleware/isOwnerOrUser";
import processData from "../utils/processData";
import convertToLocaleString from "../utils/covertToLocaleString";
import Device from "../model/Device";
const router = express.Router();
let name = "";
const getName = async (id: string) => {
  const name = await Device.findById(id).exec();

  return name?.name;
};

router.get(
  "/:id",
  isAuthenticated,
  isOwnerOrUser,
  async (req: Request, res: Response) => {
    const finalName = await getName(req.params.id);
    console.log(finalName);
    Data.find(
      {
        deviceid: req.params.id,
        date: {
          $lte: req.query.dateTo
            ? new Date(req.query.dateTo as string)
            : new Date(),
          $gte: req.query.dateFrom
            ? new Date(req.query.dateFrom as string)
            : new Date(Date.now() - 1000 * (60 * 60)),
        },
      },

      (err: CallbackError | undefined, foundData: Array<Document<IData>>) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        if (foundData.length === 0)
          return res.status(200).json(new SuccessResponse("No data found"));

        let finalData = processData(
          foundData,
          req.query.granularity ? +req.query.granularity : 5
        );
        finalData = convertToLocaleString(finalData);

        return res.status(200).json(
          new SuccessResponse("ok", {
            data: finalData,
            lastData: finalData[finalData.length - 1],
            name: finalName,
          })
        );
      }
    );
  }
);

router.post("/", isDeviceAuthenticated, (req: Request, res: Response) => {
  req.body.data.forEach((data: IData) => {
    const newData = new Data<IData>({
      deviceid: req.body.deviceid,
      temperature: data.temperature,
      humidity: data.humidity,
      date: data.date || new Date(),
    });
    newData.save((err: CallbackError | undefined, savedData: IData) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      if (!savedData) res.status(400).json(new ErrorResponse("data not saved"));
    });
  });
  return res.status(201).json(new SuccessResponse("ok"));
});

//   let newData = new Data<IData>({
//     deviceid: req.body.deviceid,
//     temperature: req.body.temperature,
//     humidity: req.body.humidity,
//     date: new Date(),
//   });
//   newData.save((err: CallbackError | undefined, savedData: IData) => {
//     if (err) return res.status(400).json(new ErrorResponse(err));
//     if (!savedData) res.status(400).json(new ErrorResponse("data not saved"));
//   });
// });

export default router;
