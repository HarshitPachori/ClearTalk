import { Router } from "express";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";
import { searchContacts } from "../controllers/ContactController.js";

const contactRoutes = Router();
contactRoutes.post("/search", verifyJwtToken, searchContacts);

export default contactRoutes;
