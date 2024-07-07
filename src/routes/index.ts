import express, { Router } from "express";
import userRoutes from "./usersRoutes/usersRoutes.js";
import postRoutes from "./postsRoutes/postsRoutes.js";
const router: Router = express.Router();
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
export default router;
