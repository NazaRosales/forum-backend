import { Request, Response } from "express";
import { loggingAuth } from "../../helpers/authServices.js";
import pool from "../../database/db.js";
import { tokenSign } from "../../helpers/tokensServices.js";
import { User } from "../../models/userModel.js";

const logginAuth = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const getUserQuery = "SELECT * FROM users WHERE email = $1";
    const resQuery = await pool.query(getUserQuery, [email]);
    if (resQuery.rowCount) {
      const user: User = resQuery.rows[0];
      const hash: string = user.password;
      if (await loggingAuth(password, hash)) {
        const newToken = tokenSign(user);
        return res.status(200).json({ data: user, token: newToken });
      }
    }
    return res
      .status(400)
      .json({ message: "Email or password are incorrect." });
  } catch (error) {
    console.log(`Error on auth loggin: ${error}`);
    return res.status(404).json(error);
  }
};

export default logginAuth;
