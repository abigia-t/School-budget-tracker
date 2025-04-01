import express from "express";
import {
  registerStudent,
  getAllStudents,
  loginStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  changeStudentPassword,
} from "../controllers/studentController.js";
import getMessages from "../controllers/studentMessageController.js";

const router = express.Router();

// **Student Routes**
router.post("/register", registerStudent); // Register a new student
router.get("/", getAllStudents); // Get all students
router.post("/login", loginStudent); // Get all students
router.put("/change-password", changeStudentPassword);
router.get("/messages", getMessages); // Get all messages for a student
router.get("/:id", getStudentById); // Get a single student
router.put("/:id", updateStudent); // Update a student
router.delete("/:id", deleteStudent); // Delete a student
export default router;
