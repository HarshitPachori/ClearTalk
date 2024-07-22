import { Router } from "express";
import { getMessages } from "../controllers/MessageController.js";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";

const messageRoutes = Router();
messageRoutes.post("/get-messages", verifyJwtToken, getMessages);
export default messageRoutes;
