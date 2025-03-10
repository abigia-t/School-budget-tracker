import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

// Utility: Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// **1. Register a new Student**
export const registerStudent = async (req, res) => {
  try {
    const { studentId, firstName, middleName, lastName, email, password, phoneNumber, address } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ status: false, message: "Please enter a valid email." });
    }

    // Check if email exists
    const studentExists = await Student.findOne({ email: email.toLowerCase() });
    if (studentExists) {
      return res.json({ status: false, message: "Student with this email already exists." });
    }

    // Ensure password length > 8
    if (!password || password.length < 8) {
      return res.json({ status: false, message: "Password must be at least 8 characters long." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create and save Student
    const student = new Student({
      studentId,
      firstName,
      middleName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      address,
      role: "Student", // Default role
    });

    const savedStudent = await student.save();

    res.json({
      status: true,
      message: "Student registered successfully",
      student: { ...savedStudent._doc, password: undefined },
    });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **2. Student Login**
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email: email.toLowerCase() });

    if (!student) {
      return res.json({ status: false, message: "No student found with this email." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.json({ status: false, message: "Invalid password." });
    }

    res.status(200).json({
      message: "Login successful",
      student: {
        _id: student.id,
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        address: student.address,
        role: student.role,
      },
    });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **3. Get All Students**
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password"); // Exclude password
    res.status(200).json(students);
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **4. Get Student By ID**
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select("-password");

    if (!student) return res.json({ status: false, message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **5. Update Student Details**
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, firstName, middleName, lastName, email, phoneNumber, address } = req.body;

    const student = await Student.findById(id);
    if (!student) return res.json({ status: false, message: "Student not found" });

    student.studentId = studentId || student.studentId;
    student.firstName = firstName || student.firstName;
    student.middleName = middleName || student.middleName;
    student.lastName = lastName || student.lastName;
    student.email = email || student.email;
    student.phoneNumber = phoneNumber || student.phoneNumber;
    student.address = address || student.address;

    await student.save();
    res.json({ status: true, message: "Student updated successfully", student });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **6. Delete Student**
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) return res.json({ status: false, message: "Student not found" });

    res.json({ status: true, message: "Student deleted successfully" });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **7. Change Student Password**
export const changeStudentPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const student = await Student.findOne({ email: email.toLowerCase() });

    if (!student) return res.json({ status: false, message: "Student not found" });

    if (newPassword !== confirmPassword) {
      return res.json({ status: false, message: "Passwords do not match" });
    }

    if (newPassword.length < 8) {
      return res.json({ status: false, message: "Password must be at least 8 characters long" });
    }

    student.password = await hashPassword(newPassword);
    await student.save();

    res.json({ status: true, message: "Password changed successfully" });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};
