import { Router } from "express";
import multer from "multer";
import { getMessages, uploadFile } from "../controllers/MessageController.js";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";

const messageRoutes = Router();
const upload = multer({ dest: "uploads/files" });
messageRoutes.post("/get-messages", verifyJwtToken, getMessages);
messageRoutes.post(
  "/upload-file",
  verifyJwtToken,
  upload.single("file"),
  uploadFile
);
export default messageRoutes;
