import User from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register User
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address, role } = req.body;

    console.log("🔹 Registering user:", { fullName, email, phoneNumber, address, role });

    // Validate required fields
    if (!fullName || !email || !password || !phoneNumber || !address || !role) {
      return res.status(400).json({ error: "All fields are required: fullName, email, password, phoneNumber, address, role" });
    }

    // Validate role
    const validRoles = ["General Manager", "Auditor", "Finance And Resource Head", "School Director", "HR Head", "Student"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Allowed roles are: ${validRoles.join(", ")}` });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ fullName, email, password: hashedPassword, phoneNumber, address, role });

    await newUser.save();
    console.log("✅ User registered:", newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,  // Your JWT secret
      { expiresIn: process.env.JWT_EXPIRES || '1d' }  // Token expiry (1 day by default)
    );

    // Respond with the token and user info
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role }
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

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,  // Your JWT secret
      { expiresIn: process.env.JWT_EXPIRES || '1d' }  // Token expiry (1 day by default)
    );

    // Respond with the token and user data
    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
