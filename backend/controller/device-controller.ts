import express, { Request, Response } from "express";
import crypto from "crypto";
import isAuthenticated from "../middleware/isAuthenticated";
import SuccessResponse from "../response/success-response";
import AuthKey from "../model/AuthKey";
import Device from "../model/Device";
import { CallbackError, Document } from "mongoose";
import IDevice from "../interface/Device";
import ErrorResponse from "../response/error-response";
import IAuthKey from "../interface/AuthKey";
import isOwnerOrUser from "../middleware/isOwnerOrUser";
import isOwner from "../middleware/isOwner";
import Data from "../model/Data";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  isOwnerOrUser,
  (req: Request, res: Response) => {
    Device.find()
      .or([{ owner: req.user.username }, { users: req.user.username }])

      .exec((err: CallbackError | undefined, foundDevices: Array<any>) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        if (foundDevices.length === 0)
          return res.status(200).json(new SuccessResponse("no devices"));

        foundDevices.forEach((device) => {
          console.log(device);

          Data.find({ deviceId: device._id.toString() })
            .limit(1)

            .exec((err: CallbackError | undefined, foundData: any) => {
              console.log(foundData);

              if (err) return res.status(400).json(new ErrorResponse(err));
              if (foundData.length === 0) {
                device.temperature = 0;
              } else {
                device.temperature = foundData[0].temperature;
              }
            });
        });

        return res
          .status(200)
          .json(new SuccessResponse("success", foundDevices));
      });
  }
);

router.get(
  "/:id",
  isAuthenticated,
  isOwnerOrUser,
  (req: Request, res: Response) => {
    Device.findById(req.params.id).exec(
      (err: CallbackError, foundDevice: any) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        if (!foundDevice)
          res.status(404).json(new ErrorResponse("no device found"));

        AuthKey.findOne({ deviceId: foundDevice._id }).exec(
          (err: CallbackError, foundKey: any) => {
            if (err) return res.status(400).json(new ErrorResponse(err));
            if (!foundKey)
              return res.status(404).json(new ErrorResponse("no key found"));
            foundDevice = { ...foundDevice._doc, key: foundKey.key };
            return res
              .status(200)
              .json(new SuccessResponse("success", foundDevice));
          }
        );
      }
    );
  }
);

router.post("/", isAuthenticated, (req: Request, res: Response) => {
  const newDevice = new Device({
    name: req.body.name,
    owner: req.user.username,
  });
  newDevice.save((err: CallbackError | undefined, savedDevice: any) => {
    if (err) return res.status(400).json(new ErrorResponse(err));
    const newKey = new AuthKey({
      deviceId: savedDevice._id,
      key: crypto.randomBytes(32).toString("hex"),
    });
    newKey.save((err: CallbackError | undefined, savedKey: IAuthKey) => {
      if (err)
        return res
          .status(400)
          .json(new ErrorResponse(`error saving key: ${err}`));
      return res
        .status(201)
        .json(
          new SuccessResponse("created", { device: savedDevice, key: savedKey })
        );
    });
  });
});

router.put("/:id", isAuthenticated, isOwner, (req: Request, res: Response) => {
  Device.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: CallbackError | undefined, updatedDevice: Document<IDevice>) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      return res.status(200).json(new SuccessResponse("updated"));
    }
  );
});

router.delete(
  "/:id",
  isAuthenticated,
  isOwner,
  (req: Request, res: Response) => {
    Device.findByIdAndDelete(
      req.params.id,
      (err: CallbackError | undefined, deletedDoc: Document<IDevice>) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        AuthKey.findOneAndDelete(
          { deviceId: req.params.id },
          (err: CallbackError | undefined, deletedKey: Document<IAuthKey>) => {
            if (err) return res.status(400).json(new ErrorResponse(err));
            return res.status(200).json(new SuccessResponse("deleted"));
          }
        );
      }
    );
  }
);

export default router;
