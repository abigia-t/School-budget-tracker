import express from "express";
import {registerActor,loginActor,getAllActors,getActorById,updateActor,deleteActor,changePassword} from "../controllers/actorController.js";

const router = express.Router();

router.post("/register", registerActor);
router.post("/login", loginActor);
router.get("/", getAllActors);
router.get("/:id", getActorById);
router.put("/:id", updateActor);
router.delete("/:id", deleteActor);
router.put("/change-password", changePassword);

export default router;