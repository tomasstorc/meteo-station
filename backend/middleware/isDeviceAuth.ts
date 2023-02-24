import { RequestHandler, Request, Response, NextFunction } from "express";
import mongoose, { CallbackError } from "mongoose";
import IAuthKey from "../interface/AuthKey";
import AuthKey from "../model/AuthKey";
import ErrorResponse from "../response/error-response";

const isDeviceAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deviceKey = req.headers["authorization"];

  if (!deviceKey)
    return res.status(401).json(new ErrorResponse("unauthorized"));

  AuthKey.findOne(
    { key: deviceKey, deviceId: req.body.id },
    (err: CallbackError | undefined, foundKey: IAuthKey | undefined) => {
      if (err) return res.status(401).json(new ErrorResponse(err));
      if (!foundKey)
        return res.status(401).json(new ErrorResponse("invalid key"));

      if (foundKey) next();
    }
  );
};

export default isDeviceAuthenticated;
