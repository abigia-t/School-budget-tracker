import express from "express";
import { sendContactMessage, getContactMessages, deleteContactMessage } from "../controllers/contactMessageController.js";

const router = express.Router();

router.post("/send", sendContactMessage); // Add new message
router.get("/", getContactMessages); // Fetch all messages
router.delete("/:id", deleteContactMessage); // Delete a message by ID

export default router;
