import express from "express";
import { 
  registerStudent, 
  getAllStudents, 
  getStudentById, 
  updateStudent, 
  deleteStudent,
  changeStudentPassword
} from "../controllers/studentController.js";

const router = express.Router();

// **Student Routes**
router.post("/register", registerStudent);  // Register a new student
router.get("/", getAllStudents);            // Get all students
router.get("/:studentId", getStudentById);  // Get a single student
router.put("/:studentId", updateStudent);   // Update a student
router.delete("/:studentId", deleteStudent);// Delete a student
router.put("/change-password", changeStudentPassword); // Change password for student

export default router;
