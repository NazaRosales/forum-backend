import { Request, Response } from "express";
import loggingAuth from "../../services/logginAuth.js";
import pool from "../../database/db.js";

const logginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const getUserQuery = "SELECT * FROM users WHERE email = $1";
    const resQuery = await pool.query(getUserQuery, [email]);
    if (resQuery.rowCount) {
      const hash: string = resQuery.rows[0].password;
      if (await loggingAuth(password, hash)) {
        return res.status(200).json({ message: "Loggin!" });
      }
    }
    return res.status(400).json({ message: "Not loggin." });
  } catch (error) {
    console.log(`Error on auth loggin: ${error}`);
    return res.status(404).json(error);
  }
};

export default logginController;
