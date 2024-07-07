import express, { Router } from "express";
import userRoutes from "./userRoutes/userRoutes.js";
const router: Router = express.Router();
router.use("/user", userRoutes);
export default router;
