import { Router } from "express";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";
import {
  getAllContactsForDMList,
  searchContacts,
} from "../controllers/ContactController.js";

const contactRoutes = Router();
contactRoutes.post("/search", verifyJwtToken, searchContacts);
contactRoutes.get(
  "/get-contacts-for-dm",
  verifyJwtToken,
  getAllContactsForDMList
);
export default contactRoutes;
