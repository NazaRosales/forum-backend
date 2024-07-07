import express from "express";
import createNewUser from "../../controllers/usersControllers/createNewUser.js";
import getUserInfo from "../../controllers/usersControllers/getUserInfo.js";
import logginController from "../../controllers/usersControllers/logginController.js";

const userRoutes = express.Router();

userRoutes.post("/", createNewUser);
userRoutes.get("/", getUserInfo);
userRoutes.get("/loggin", logginController);

export default userRoutes;
