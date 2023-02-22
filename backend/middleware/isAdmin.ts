import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../response/error-response";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req?.user?.role === "admin") {
    next();
  } else {
    return res.status(401).json(new ErrorResponse("unauthorized"));
  }
};

export default isAdmin;
