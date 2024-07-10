import express from "express";
import getUserInfo from "../../controllers/usersControllers/getUserInfo.js";

const userRoutes = express.Router();

userRoutes.get("/", getUserInfo);

export default userRoutes;
