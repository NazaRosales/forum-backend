import express from "express";
import getUserInfo from "../../controllers/usersControllers/getUserInfo.js";
import verifyUser from "../../middlewares/verifyUser.js";

const userRoutes = express.Router();

userRoutes.get("/", verifyUser, getUserInfo);

export default userRoutes;
