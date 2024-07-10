import { Request, Response } from "express";
import pool from "../../database/db.js";

const createNewPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, postText } = req.body;
    if (!userId || !postText) {
      return res
        .status(409)
        .json({ message: "User ID and Post text are required." });
    }
    const insertPostQuery = "INSERT INTO posts (text) VALUES($1) RETURNING id";
    const { rows } = await pool.query(insertPostQuery, [postText]);
    const postId = rows[0].id;

    const createUserPostsQuery =
      "INSERT INTO user_posts (user_id, post_id) VALUES ($1, $2)";
    await pool.query(createUserPostsQuery, [userId, postId]);
    return res.status(200).json({ message: "Created post" });
  } catch (error) {
    console.log(`Error creating post: ${error}`);
    return res.status(400).json({ error });
  }
};

export default createNewPost;
