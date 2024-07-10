import { Request, Response } from "express";
import pool from "../../database/db.js";
import { hashPassword } from "../../helpers/authServices.js";
const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userName, email, password, role = "user" } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(401)
        .json({ message: "User name, email and password are required" });
    }

    const getUserQuery = "SELECT * FROM users WHERE email = $1";
    const resultGetUser = await pool.query(getUserQuery, [email]);
    if (resultGetUser.rowCount) {
      return res.status(409).json({ message: "User already exist" });
    }

    const hashedPassword = await hashPassword(password);
    const postUserQuery =
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)";
    const values = [userName, email, hashedPassword, role];
    await pool.query(postUserQuery, values);

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
export default registerUser;
