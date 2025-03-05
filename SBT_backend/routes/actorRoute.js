import express from "express";
import {registerActor,loginActor,getAllActors,getActorById,updateActor,deleteActor,changePassword,} from "../controllers/actorController.js";
import authMiddleware  from "../middleware/auth.js";

const router = express.Router();

// Register a new actor (only System Admin can do this)
router.post("/register", registerActor);

// Login route (all users)
router.post("/login", loginActor);

// Get all actors (only System Admin)
router.get("/", authMiddleware, getAllActors);

// Get an actor by ID
router.get("/:id", authMiddleware, getActorById);

// Update an actor's details
router.put("/:id", authMiddleware, updateActor);

// Delete an actor
router.delete("/:id", authMiddleware, deleteActor);

// Change password
router.put("/change-password", changePassword);

export default router;
