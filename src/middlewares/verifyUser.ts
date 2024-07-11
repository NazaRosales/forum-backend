import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/tokensServices.js";

const verifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const token: string | undefined = req.headers.authorization?.split(" ").pop();
  const tokenVerify = token && verifyToken(token);
  if (!tokenVerify) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
export default verifyUser;
