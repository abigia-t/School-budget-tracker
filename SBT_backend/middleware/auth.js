import jwt from "jsonwebtoken";
import Actor from "../models/actorModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.actor = await Actor.findById(decoded._id).select("-password");

    if (!req.actor) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default auth;
