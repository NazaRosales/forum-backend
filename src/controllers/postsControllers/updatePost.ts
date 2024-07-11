import { Request, Response } from "express";
import pool from "../../database/db.js";

const updatePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { newPostText, postId, userId } = req.body;
    const getUserPosts = "SELECT * FROM user_posts WHERE user_id = $1";
    const userPosts = await pool.query(getUserPosts, [userId]);
    const postToUpdate = userPosts.rows.filter(
      (item) => item.post_id === postId
    );

    if (!postToUpdate.length) {
      return res
        .status(404)
        .json({ message: `There is no post with the id ${postId}` });
    }
    const updatePostQuery = "UPDATE posts SET text = $1 WHERE id = $2";
    const resUpdatePost = await pool.query(updatePostQuery, [
      newPostText,
      postId,
    ]);
    if (resUpdatePost.rowCount) {
      return res.status(200).json({ message: "Post updated."});
    }
    return res.status(404).json({ message: "failed updating post." });
  } catch (error) {
    console.log(`Error updating post: ${error}`);
    return res.status(400).json({ error });
  }
};
export default updatePost;
