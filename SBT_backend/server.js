import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"; // ✅ Import body-parser
import connectDB from "./configs/db.js";
import actorRoute from "./routes/actorRoute.js";
import studentRoute from "./routes/studentRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import requestRoute from "./routes/requestRoute.js";
import approvedBudgetRoute from "./routes/approvedBudgetRoute.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// **Middlewares**
app.use(express.json()); // ✅ Express has built-in JSON parser, no need for bodyParser.json()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Only needed for URL-encoded form data

// **Routes**
app.use("/api/actors", actorRoute);
app.use("/api/students", studentRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/request", requestRoute);
app.use("/api/approved-budget", approvedBudgetRoute);

// **Connect to Database**
connectDB();

// **Default Route**
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
