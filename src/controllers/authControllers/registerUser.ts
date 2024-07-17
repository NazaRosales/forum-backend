import { Request, Response } from "express";
import pool from "../../database/db.js";
import { hashPassword } from "../../helpers/authServices.js";
const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      profileImage = "",
      role = "user",
    } = req.body;

    if (!name || !lastName || !userName || !email || !password) {
      return res.status(401).json({
        ok: false,
        message:
          "Required fields are missing (Name, lastname, user name, email and password).",
      });
    }
    const getUserQuery = "SELECT * FROM users WHERE email = $1";
    const resultGetUser = await pool.query(getUserQuery, [email]);
    if (resultGetUser.rowCount) {
      return res.status(409).json({ ok: false, message: "User already exist" });
    }

    const hashedPassword = await hashPassword(password);
    const postUserQuery =
      "INSERT INTO users (name, lastname, username, email, password, profileimage, role) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [
      name,
      lastName,
      userName,
      email,
      hashedPassword,
      profileImage,
      role,
    ];
    await pool.query(postUserQuery, values);

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ ok: false, error: error });
  }
};
export default registerUser;
