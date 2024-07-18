import { Router } from "express";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";
import {
  getUserInfo,
  updateUserInfo,
  updateUserProfileImage,
  removeUserProfileImage,
} from "../controllers/UserController.js";
import multer from "multer";

const userRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

userRoutes.get("/user-info", verifyJwtToken, getUserInfo);
userRoutes.put("/update-user-info", verifyJwtToken, updateUserInfo);
userRoutes.put(
  "/update-user-profile-image",
  verifyJwtToken,
  upload.single("profile-image"),
  updateUserProfileImage
);
userRoutes.delete(
  "/delete-user-profile-image",
  verifyJwtToken,
  removeUserProfileImage
);

export default userRoutes;
