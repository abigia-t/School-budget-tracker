import jwt from "jsonwebtoken";
import Actor from "../models/actorModel.js";
import Student from "../models/studentModel.js";

// Authentication middleware
export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user = await Actor.findById(decoded._id).select("-password");
    if (!user) {
      user = await Student.findById(decoded._id).select("-password");
    }
    
    if (!user) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Authorization middleware
export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles || roles.length === 0) {
      return next();
    }
    
    if (!req.user?.role) {
      return res.status(403).json({ message: "Access denied. No role assigned." });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Requires roles: ${roles.join(', ')}` 
      });
    }
    
    next();
  };
};

// Role-based middleware arrays for convenience
export const adminAuth = [authenticate, authorize(['admin'])];
export const directorAuth = [authenticate, authorize(['director'])];
export const auditorAuth = [authenticate, authorize(['auditor'])];
export const financeAuth = [authenticate, authorize(['finance'])];
export const hrAuth = [authenticate, authorize(['hr'])];
export const teacherAuth = [authenticate, authorize(['teacher'])];
export const studentAuth = [authenticate, authorize(['student'])];
export const parentAuth = [authenticate, authorize(['parent'])];

// Export `protect` alias to avoid import errors
export const protect = authenticate;

// Default export as authenticate (optional)
export default authenticate;
