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
