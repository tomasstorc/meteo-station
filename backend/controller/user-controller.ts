import express, { Request, Response } from "express";
import User from "../model/User";
import IUser from "../interface/User";
import validatePassword from "../utils/password-validator";
import ErrorResponse from "../response/error-response";
import { CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import SuccessResponse from "../response/success-response";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  if (!validatePassword(req.body.password)) {
    return res
      .status(400)
      .json(new ErrorResponse("password did not meet minimum criteria"));
  }
  User.findOne(
    { username: req.body.username },
    (err: CallbackError | undefined, foundUser: IUser | undefined) => {
      if (err) return res.status(400).json(new ErrorResponse(err));
      if (foundUser)
        return res
          .status(400)
          .json(new ErrorResponse("user with given username already exist"));
      bcrypt.hash(
        req.body.password,
        10,
        (err: Error | undefined, hash: string) => {
          if (err) return res.status(400).json(new ErrorResponse(err));
          const user = new User<IUser>({
            username: req.body.username,
            password: hash,
            role: req.body.role,
          });
          user.save((err: CallbackError | undefined, savedUser: IUser) => {
            if (err) return res.status(400).json(new ErrorResponse(err));
            return res.status(201).json(new SuccessResponse("user created"));
          });
        }
      );
    }
  );
});

export default router;
