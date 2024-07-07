import { Request, Response } from "express";
import pool from "../../database/db.js";

const getUserInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    const getUserQuery = "SELECT * FROM users WHERE email = $1";
    const resultGetUser = await pool.query(getUserQuery, [email]);
    if (resultGetUser.rowCount) {
      const { id, username } = resultGetUser.rows[0];
      return res.status(200).json({ userInfo: { id, username } });
    }
    return res
      .status(404)
      .json({ message: "User not found, check the email." });
  } catch (error) {
    console.log(`Error getting user info: ${error}`);
    return res.status(400).json({ error });
  }
};
export default getUserInfo;
