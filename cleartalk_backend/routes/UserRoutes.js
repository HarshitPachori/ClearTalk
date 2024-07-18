import { Router } from "express";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";
import { getUserInfo, updateUserInfo } from "../controllers/UserController.js";

const userRoutes = Router();

userRoutes.get("/user-info", verifyJwtToken, getUserInfo);
userRoutes.put("/update-user-info", verifyJwtToken, updateUserInfo);

export default userRoutes;
