import { Request, Response } from "express";
import pool from "../../database/db.js";

const deletePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }
    const deletePostQuery = "DELETE FROM posts WHERE id = $1";
    const resultDelete = await pool.query(deletePostQuery, [postId]);
    if (!resultDelete.rowCount) {
      return res
        .status(404)
        .json({ message: `There is no post with id ${postId}` });
    }
    return res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.log(`Error deleting post: ${error}`);
    return res.status(400).json({ error });
  }
};
export default deletePost;
