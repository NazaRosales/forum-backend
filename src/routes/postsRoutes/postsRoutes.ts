import express from "express";
import createNewPost from "../../controllers/postsControllers/createNewPost.js";
import getPostsUser from "../../controllers/postsControllers/getPostsUser.js";
import verifyUser from "../../middlewares/verifyUser.js";
import verifyRole from "../../middlewares/verifyRole.js";
import deletePost from "../../controllers/postsControllers/deletePost.js";
import updatePost from "../../controllers/postsControllers/updatePost.js";
const postRoutes = express.Router();

postRoutes.get("/", verifyUser, getPostsUser);
postRoutes.post("/", verifyUser, verifyRole("admin"), createNewPost);
postRoutes.put("/", verifyUser, updatePost);
postRoutes.delete("/", verifyUser, deletePost);
export default postRoutes;
