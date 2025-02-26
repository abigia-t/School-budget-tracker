const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register a user
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address, role, paymentData } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
      paymentData: role === "Student" ? paymentData : null, // Only include paymentData for students
    });

    const savedUser = await user.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };
