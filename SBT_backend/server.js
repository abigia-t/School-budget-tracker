import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./configs/db.js";
import actorRoute from "./routes/actorRoute.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express(); // ✅ This was missing

app.use(express.json()); // Body parser middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers

// Connect to Database
connectDB();

// Rate limiting (Prevent brute-force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 min
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// **Use routes**
app.use("/api/actors", actorRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
