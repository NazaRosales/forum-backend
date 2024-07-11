import { Request, Response, NextFunction } from "express";
import pool from "../database/db.js";
import { User } from "../models/models.js";

const verifyRole = (role: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const getUserQuery = "SELECT * FROM users WHERE id = $1";
    const resultGetUser = await pool.query(getUserQuery, [userId]);
    if (!resultGetUser.rowCount) {
      return res.status(404).json({ message: "User not found" });
    }
    const user: User = resultGetUser.rows[0];
    if (user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized role." });
    }
  };
};
export default verifyRole;
