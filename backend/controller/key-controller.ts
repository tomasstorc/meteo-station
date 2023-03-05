import express from "express";
import { CallbackError, Document } from "mongoose";
import IAuthKey from "../interface/AuthKey";
import isAuthenticated from "../middleware/isAuthenticated";
import isOwner from "../middleware/isOwner";
import AuthKey from "../model/AuthKey";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";
import crypto from "crypto";

const router = express.Router();

router.get("/:id", isAuthenticated, isOwner, (req, res) => {
  AuthKey.find(
    { deviceId: req.params.id },
    (err: CallbackError | undefined, foundKey: Document<IAuthKey>) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      if (!foundKey)
        return res.status(200).json(new SuccessResponse("No auth key found"));
      return res
        .status(200)
        .json(new SuccessResponse("ok", { authKeys: foundKey }));
    }
  );
});

router.put("/:id", isAuthenticated, isOwner, (req, res) => {
  AuthKey.findOneAndUpdate(
    { deviceId: req.params.id },
    { key: crypto.randomBytes(32).toString("hex") },
    { upsert: true, returnDocument: "after" },
    (err: CallbackError | undefined, updatedKey: Document<IAuthKey>) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      return res
        .status(200)
        .json(new SuccessResponse("updated", { key: updatedKey }));
    }
  );
});

export default router;
