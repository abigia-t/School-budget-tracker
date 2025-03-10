import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import actorRoute from "./routes/actorRoute.js"; // Import actor routes
import studentRoute from "./routes/studentRoute.js"; // Import student routes
import paymentRoute from "./routes/paymentRoute.js"; // Import payment routes

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
app.use("/api/actors", actorRoute);   // Actor related routes
app.use("/api/students", studentRoute); // Student related routes
app.use("/api/payments", paymentRoute); // Payment related routes

// **Default Route**
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
