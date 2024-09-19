import { Router } from "express";
import multer from "multer";
import {
  deleteFilesUploadedOneWeekAgo,
  getMessages,
  uploadFile,
} from "../controllers/MessageController.js";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";

const messageRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
messageRoutes.post("/get-messages", verifyJwtToken, getMessages);
messageRoutes.post(
  "/upload-file",
  verifyJwtToken,
  upload.single("file"),
  uploadFile
);

messageRoutes.delete("/cleanFiles", deleteFilesUploadedOneWeekAgo);
export default messageRoutes;
