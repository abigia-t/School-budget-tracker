import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import actorRoute from "./routes/actorRoute.js";
import studentRoute from "./routes/studentRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import contactMessageRoutes from "./routes/contactMessageRoutes.js";
import adminMessageRoutes from "./routes/adminMessageRoutes.js";
import statsRoutes from "./routes/statsRoute.js";
import payrollRoute from "./routes/payrollRoute.js";
import budgetRoutes from './routes/budgetRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Get directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware for parsing JSON
app.use(express.json());

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Connect to Database
const connectToDatabase = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
    process.exit(1);
  }
};

connectToDatabase();

// API Routes
app.use("/api/actors", actorRoute);
app.use("/api/students", studentRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/admin-messages", adminMessageRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/payrolls", payrollRoute);
app.use('/api/budgets', budgetRoutes);


// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something broke!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Serving uploads from: ${path.join(__dirname, 'uploads')}`);
});