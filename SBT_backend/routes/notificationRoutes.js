import express from "express";
import { sendNotification, getNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/send", sendNotification);
router.get("/", getNotifications); // ✅ Fixed function name

export default router;
