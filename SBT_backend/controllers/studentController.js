import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "01f41f9374cc29b2e533857d284edfb01477a28bf55e063f0a7db76c5fa7bec2";

// Utility: Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// **1. Register a new Student**
export const registerStudent = async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      middleName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      grade,
    } = req.body;

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid email." });
    }

    const studentExists = await Student.findOne({ email: email.toLowerCase() });
    if (studentExists) {
      return res.status(400).json({
        status: false,
        message: "Student with this email already exists.",
      });
    }

    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 8 characters long and strong.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const student = new Student({
      studentId,
      firstName,
      middleName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      grade,
      address,
      role: "Student",
    });

    await student.save();
    res
      .status(201)
      .json({ status: true, message: "Student registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **2. Student Login with JWT**
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email: email.toLowerCase() });

    if (!student) {
      return res
        .status(404)
        .json({ status: false, message: "No student found with this email." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: student._id, role: student.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      student: {
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        grade: student.grade,
        email: student.email,
        role: student.role, // ✅ Include role
        token,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **3. Get All Students**
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **4. Get Student By ID**
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select("-password");
    if (!student)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **5. Update Student Details**
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!student)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    res.json({
      status: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **6. Delete Student**
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    res.json({ status: true, message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **7. Change Student Password**
export const changeStudentPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const student = await Student.findOne({ email: email.toLowerCase() });
    if (!student)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Passwords do not match" });
    }

    if (!validator.isStrongPassword(newPassword, { minLength: 8 })) {
      return res
        .status(400)
        .json({ status: false, message: "Password is too weak" });
    }

    student.password = await hashPassword(newPassword);
    await student.save();
    res.json({ status: true, message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};
