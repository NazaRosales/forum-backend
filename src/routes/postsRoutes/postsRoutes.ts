import express from "express";
import createNewPost from "../../controllers/postsControllers/createNewPost.js";
const postRoutes = express.Router();

postRoutes.post("/", createNewPost);

export default postRoutes;
