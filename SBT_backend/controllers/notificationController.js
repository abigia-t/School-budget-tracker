import Notification from "../models/notificationModel.js";
import Actor from "../models/actorModel.js";
import Student from "../models/studentModel.js";

// Send Notification
export const sendNotification = async (req, res) => {
  const { recipientType, recipientDetail, message } = req.body;

  // Hardcoded Admin ID (since we're bypassing JWT authentication)
  const adminId = "67ced47ac50c85edc23f8bf6";  // Replace adminId = req.user.id; when i use JWT

  try {
    let recipientQuery = {}; // Query to filter recipients

    if (recipientType === "specific_actor") {
      recipientQuery = { email: recipientDetail };
    } else if (recipientType === "specific_student") {
      recipientQuery = { studentId: recipientDetail };
    }

    let recipientFound = true;

    if (recipientType === "specific_actor") {
      recipientFound = await Actor.findOne(recipientQuery);
    } else if (recipientType === "specific_student") {
      recipientFound = await Student.findOne(recipientQuery);
    }

    if (!recipientFound) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    const newNotification = new Notification({
      recipientType,
      recipientDetail: recipientDetail || null,
      message,
      sentBy: adminId,  // Use the hardcoded adminId
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification sent successfully!" });
  } catch (error) {
    console.error("Send Notification Error:", error);
    res.status(500).json({ message: "Failed to send notification.", error });
  }
};

// Fetch All Notifications (For Admin View)
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("sentBy", "email");

    if (!Array.isArray(notifications)) {
      console.warn("Backend did not return an array. Sending empty array.");
      return res.status(200).json([]);
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json([]);
  }
};
