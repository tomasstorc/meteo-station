import express, { Request, Response } from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import SuccessResponse from "../response/success-response";

const router = express.Router();

router.post("/", isAuthenticated, (req: Request, res: Response) => {
  return res.json(new SuccessResponse("ok", req.body));
});

export default router;
