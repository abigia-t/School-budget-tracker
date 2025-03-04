import Actor from "../models/actorModel.js";
import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });
};

// Register User (Actor or Student)
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, role, studentId, middleName } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phoneNumber || !address || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user;
    if (role === "Student") {
      if (!studentId || !middleName) {
        return res.status(400).json({ error: "Student ID and Middle Name are required for students" });
      }

      user = await Student.findOne({ email });
      if (user) return res.status(400).json({ error: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new Student({ studentId, firstName, middleName, lastName, email, password: hashedPassword, phoneNumber, address, role });

    } else {
      const validRoles = ["General Manager", "School Director", "System Admin", "Auditor", "Human Resource Head", "Resource and Finance Head"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      user = await Actor.findOne({ email });
      if (user) return res.status(400).json({ error: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new Actor({ firstName, lastName, email, password: hashedPassword, phoneNumber, address, role });
    }

    await user.save();
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email, role: user.role },
    });

  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    let user = await Actor.findOne({ email }) || await Student.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id, user.role);
    let redirectUrl = "/";

    switch (user.role) {
      case "General Manager":
        redirectUrl = "/general-manager";
        break;
      case "Auditor":
        redirectUrl = "/auditor";
        break;
      case "Finance And Resource Head":
        redirectUrl = "/finance";
        break;
      case "School Director":
        redirectUrl = "/school-director";
        break;
      case "Human Resource Head":
        redirectUrl = "/hr-head";
        break;
      case "Student":
        redirectUrl = "/student";
        break;
      default:
        redirectUrl = "/";
    }

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email, role: user.role },
      redirectUrl,
    });

  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Logout User
export const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
