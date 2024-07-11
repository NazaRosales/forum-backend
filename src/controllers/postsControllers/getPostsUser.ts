import { Request, Response } from "express";
import pool from "../../database/db.js";

const getPostsUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const getUserPosts = "SELECT * FROM user_posts WHERE user_id = $1";
    type Row = { user_id: number; post_id: number };
    type Rows = Row[];
    const resultTable = await pool.query(getUserPosts, [userId]);

    if (!resultTable.rowCount) {
      return res.status(200).json({ message: "This user has no posts." });
    }

    const rows: Rows = resultTable.rows;

    const postsPromises = rows.map(async (row: Row) => {
      const getPostsQuery = "SELECT * FROM posts WHERE id = $1";
      const result = await pool.query(getPostsQuery, [row.post_id]);
      return result.rows[0];
    });
    const posts = await Promise.all(postsPromises);
    return res.status(200).json({ posts });
  } catch (error) {
    console.log(`Error getting user's posts: ${error}`);
    return res.status(400).json({ error });
  }
};
export default getPostsUser;
