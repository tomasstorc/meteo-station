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

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  isOwnerOrUser,
  (req: Request, res: Response) => {
    Device.find()
      .or([{ owner: req.user.id }, { users: req.user.id }])
      .exec((err: CallbackError | undefined, foundDevices: Array<IDevice>) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        if (foundDevices.length === 0)
          return res.status(200).json(new SuccessResponse("no devices"));
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
    Device.findById(
      req.params.id,
      (err: CallbackError | undefined, foundDevice: IDevice) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        return res
          .status(200)
          .json(new SuccessResponse("success", foundDevice));
      }
    );
  }
);

router.post("/", isAuthenticated, (req: Request, res: Response) => {
  const newDevice = new Device({
    name: req.body.name,
    owner: req.user.id,
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
  "/id",
  isAuthenticated,
  isOwner,
  (req: Request, res: Response) => {
    Device.findByIdAndDelete(
      req.params.id,
      (err: CallbackError | undefined, deletedDoc: Document<IDevice>) => {
        if (err) return res.status(400).json(new ErrorResponse(err));
        return res.status(200).json(new SuccessResponse("deleted"));
      }
    );
  }
);

export default router;
