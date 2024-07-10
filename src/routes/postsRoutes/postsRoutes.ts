import express from "express";
import createNewPost from "../../controllers/postsControllers/createNewPost.js";
import getPostsUser from "../../controllers/postsControllers/getPostsUser.js";
import verifyUser from "../../middlewares/verifyUser.js";
import verifyRole from "../../middlewares/verifyRole.js";
const postRoutes = express.Router();

postRoutes.post("/", verifyUser, verifyRole("admin"), createNewPost);
postRoutes.get("/", getPostsUser);
export default postRoutes;
