import express from "express";
import createNewPost from "../../controllers/postsControllers/createNewPost.js";
import getPostsUser from "../../controllers/postsControllers/getPostsUser.js";
const postRoutes = express.Router();

postRoutes.post("/", createNewPost);
postRoutes.get("/", getPostsUser);
export default postRoutes;
