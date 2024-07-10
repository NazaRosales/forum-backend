import express from "express";
import registerUser from "../../controllers/authControllers/registerUser.js";
import logginAuth from "../../controllers/authControllers/logginAuth.js";
const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.get("/loggin", logginAuth);

export default authRoutes;
