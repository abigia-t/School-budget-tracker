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
