import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";

import IUser from "../interface/User";

import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  const body = req.body;

  User.findOne(
    { email: body.email },
    (err: Error | undefined, foundUser: IUser | undefined) => {
      if (!foundUser) {
        res
          .status(401)
          .json(new ErrorResponse("username or password incorrect"));
      } else if (err) {
        res.status(400).json(new ErrorResponse(err));
      } else {
        bcrypt.compare(
          body.password,
          foundUser.password,
          (err, result: boolean) => {
            if (err) {
              res.status(400).json(new ErrorResponse(err));
            } else if (!result) {
              res
                .status(401)
                .json(new ErrorResponse("Username or password is incorrect"));
            } else {
              const payload = {
                username: foundUser.username,
                role: foundUser.role,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });

              res.status(200).json(new SuccessResponse("logged in", token));
            }
          }
        );
      }
    }
  );
});

router.get("/refresh", isAuthenticated, (req: Request, res: Response) => {
  res.clearCookie("token");
  let payload = {
    name: req.user?.name,
    email: req.user?.email,
    role: req.user?.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json(new SuccessResponse("refreshed", token));
});

export default router;
