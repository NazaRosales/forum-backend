import { Request, Response } from "express";
import pool from "../../database/db.js";

const getAllPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getPostsQuery = "SELECT * FROM posts";
    const result = await pool.query(getPostsQuery);

    if (!result.rowCount) {
      return res.status(200).json({ message: "There are no posts yet" });
    }
    const data = result.rows;
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    console.log(`Error getting all posts: ${error}`);
    return res.status(400).json({ error });
  }
};
export default getAllPosts;
