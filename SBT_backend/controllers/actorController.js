import Actor from "../models/actorModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

// Utility: Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// **1. Register a new actor by System Admin in his page**
export const registerActor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, role } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({status: false, message: "Please enter a valid email." });
    }

    // Check if the email already exists
    const actorExists = await Actor.findOne({ email: email.toLowerCase() });
    if (actorExists) {
      return res.json({status: false, message: "User already exists." });
    }

    // Ensure password length > 8
    if (!password || password.length < 8) {
      return res.json({status: false, message: "Password must be at least 8 characters long." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const actor = new Actor({ firstName, lastName, email: email.toLowerCase(), password: hashedPassword, phoneNumber, address, role });

    const savedActor = await actor.save();

    res.json({
      status: true,
      message: "User registered successfully",
      actor: { ...savedActor._doc, password: undefined },
    });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};


export const loginActor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the actor by email
    const actor = await Actor.findOne({ email: email.toLowerCase() });

    // If actor is not found, send a specific error message
    if (!actor) {
      return res.json({status:false, message: "User with this email does not exist." });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, actor.password);
    if (!isMatch) {
      return res.json({ status:false, message: "Invalid password." }); // Specific message for password mismatch
    }

    // Respond with success message
    res.status(200).json({
      message: "Login successful",
      actor: { _id: actor.id, firstName: actor.firstName, lastName: actor.lastName, email: actor.email, phoneNumber: actor.phoneNumber, address: actor.address, role: actor.role,},
    });
  } catch (error) {
    res.json({status:false, message: error.message || "Server error" });
  }
};

// **3. Get All Actors in System Admin Page**
export const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find().select("-password"); // Exclude password from results
    res.status(200).json(actors);
  } catch (error) {
    res.json({status:false, message: error.message || "Server error" });
  }
};

// **4. Get Actor By ID**
export const getActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findById(id).select("-password");
    if (!actor) return resjson({status:false, message: "User not found" });

    res.status(200).json(actor);
  } catch (error) {
    res.json({ status:false, message: error.message || "Server error" });
  }
};

// **5. Update Actor Details**
export const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber, address, role } = req.body;

    const actor = await Actor.findById(id);
    if (!actor) return res.json({status:false, message: "User not found" });

    actor.firstName = firstName || actor.firstName;
    actor.lastName = lastName || actor.lastName;
    actor.email = email || actor.email;
    actor.phoneNumber = phoneNumber || actor.phoneNumber;
    actor.address = address || actor.address;
    actor.role = role || actor.role;
    await actor.save();
    res.json({status:true, message: "User updated successfully", actor });
  }
  catch (error) {
    res.json({status:false, message: error.message || "Server error" });
  }
};

// **6. Delete Actor**
export const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActor = await Actor.findByIdAndDelete(id);

    if (!deletedActor) return res.json({status:false, message: "User not found" });

    res.json({status:true, message: "User deleted successfully" });
  } catch (error) {
    res.json({status:false, message: error.message || "Server error" });
  }
};

// **7. Change Password**
export const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const actor = await Actor.findOne({ email: email.toLowerCase() });
    if (!actor) return res.json({status:false, message: "User not found" });

    if (newPassword !== confirmPassword) {
      return res.json({status:false, message: "Passwords do not match" });
    }

    if (newPassword.length < 8) {
      return res.json({status:false, message: "Password must be at least 8 characters long" });
    }

    actor.password = await hashPassword(newPassword);
    await actor.save();

    res.json({status:true, message: "Password changed successfully" });
  } catch (error) {
    res.json({status:false, message: error.message || "Server error" });
  }
};