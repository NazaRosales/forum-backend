import { Request, Response } from "express";
import pool from "../../database/db.js";
import hashPassword from "../../services/hashPassword.js";
const createNewUser = async (req: Request,res: Response): Promise<Response> => {
  try {
    const { userName, email, password } = req.body;
    const getUserQuery = "SELECT * FROM users WHERE email = $1";
    const resultGetUser = await pool.query(getUserQuery, [email]);
    if (resultGetUser.rowCount) {
      return res.status(409).json({ message: "User already exist" });
    }
    
    const hashedPassword = await hashPassword(password);
    const postUserQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [userName, email, hashedPassword];
    await pool.query(postUserQuery, values);

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
export default createNewUser;
