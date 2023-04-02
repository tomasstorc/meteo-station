import { RequestHandler, Request, Response, NextFunction } from "express";
import mongoose, { CallbackError } from "mongoose";
import Device from "../model/Device";
import IDevice from "../interface/Device";
import ErrorResponse from "../response/error-response";

const isOwner: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Device.find(
    {
      $and: [{ _id: req.params.id }, { owner: req.user. }],
    },
    (err: CallbackError | undefined, foundDevice: IDevice) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      if (!foundDevice)
        return res.status(401).json(new ErrorResponse("unauthorized"));
      next();
    }
  );
};

export default isOwner;
