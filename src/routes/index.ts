import express, { Router } from "express";
import userRoutes from "./usersRoutes/usersRoutes.js";
import postRoutes from "./postsRoutes/postsRoutes.js";
import authRoutes from "./authRoutes/authRoutes.js";
const router: Router = express.Router();
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);
export default router;
