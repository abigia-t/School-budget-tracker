import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/db.js';
import authRoute from './routes/authRoute.js';
import requestRoute from './routes/requestRoute.js';
import approvedBudgetRoute from './routes/approvedBudgetRoute.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // This ensures JSON requests are parsed correctly
app.use(bodyParser.urlencoded({ extended: true })); // Handles URL-encoded form data

// Routes
app.use("/api/auth", authRoute);
app.use("/api/request", requestRoute);
app.use("/api/approved-budget", approvedBudgetRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
