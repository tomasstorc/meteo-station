import express from "express";
import { CallbackError, Document } from "mongoose";
import IAuthKey from "../interface/AuthKey";
import isAuthenticated from "../middleware/isAuthenticated";
import isOwner from "../middleware/isOwner";
import AuthKey from "../model/AuthKey";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";

const router = express.Router();

router.get("/:id", isAuthenticated, isOwner, (req, res) => {
  AuthKey.find(
    { deviceId: req.params.id },
    (err: CallbackError | undefined, foundKeys: Document<IAuthKey>) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      if (!foundKeys)
        return res.status(200).json(new SuccessResponse("No auth keys found"));
      return res
        .status(200)
        .json(new SuccessResponse("ok", { authKeys: foundKeys }));
    }
  );
});

export default router;
