import { RequestHandler, Request, Response, NextFunction } from "express";
import { CallbackError } from "mongoose";
import IAuthKey from "../interface/AuthKey";
import AuthKey from "../model/AuthKey";
import ErrorResponse from "../response/error-response";

const isDeviceAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deviceKey = req.headers["api-key"];

  if (!deviceKey)
    return res.status(401).json(new ErrorResponse("unauthorized"));

  AuthKey.findOne(
    { key: deviceKey, deviceId: req.body.deviceid },
    (err: CallbackError | undefined, foundKey: IAuthKey | undefined) => {
      if (err) return res.status(401).json(new ErrorResponse(err));
      if (!foundKey)
        return res.status(401).json(new ErrorResponse("invalid key"));

      next();
    }
  );
};

export default isDeviceAuthenticated;
