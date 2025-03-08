<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import actorRoute from "./routes/actorRoute.js"; // Import actor routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// **Middlewares**
app.use(express.json()); // Body parser middleware
app.use(cors());
// **Connect to Database**
connectDB();

// **all API Routes**
app.use("/api/actors", actorRoute);

// **Default Route**
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});
// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
=======
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/db.js';
import authRoute from './routes/authRoute.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> 0843dfc8de6351e51fe10f1378eae429a33d62fb
