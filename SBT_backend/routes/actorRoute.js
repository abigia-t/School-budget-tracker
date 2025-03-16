import express from "express";
import {registerActor,loginActor,getAllActors,getActorById,updateActor,deleteActor,changePassword} from "../controllers/actorController.js";

const router = express.Router();
router.post("/register", registerActor);
router.get("/", getAllActors);
router.post("/login", loginActor);
router.put("/change-password", changePassword);
router.get("/:id", getActorById);
router.put("/:id", updateActor);
router.delete("/:id", deleteActor);

export default router;
