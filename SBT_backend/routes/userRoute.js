import express from 'express'

const { registerUser } = require("../controllers/userController");
const router = express.Router();

// Register a user
router.post("/register", registerUser);

module.exports = router;
