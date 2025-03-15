import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"; // ✅ Import body-parser
import connectDB from "./configs/db.js";
import actorRoute from "./routes/actorRoute.js"; // Import actor routes
import studentRoute from "./routes/studentRoute.js"; // Import student routes
import paymentRoute from "./routes/paymentRoute.js"; // Import payment routes
import contactMessageRoutes from "./routes/contactMessageRoutes.js";
import adminMessageRoutes from "./routes/adminMessageRoutes.js";
import requestRoute from "./routes/requestRoute.js";
import approvedBudgetRoute from "./routes/approvedBudgetRoute.js";

dotenv.config();

// Initialize Express app
const app = express();

// **Middlewares**
app.use(express.json()); // ✅ Express has built-in JSON parser, no need for bodyParser.json()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Only needed for URL-encoded form data


// **Connect to Database**
connectDB();

// **all API Routes**
app.use("/api/actors", actorRoute);   // Actor related routes
app.use("/api/students", studentRoute); // Student related routes
app.use("/api/payments", paymentRoute); // Payment related routes
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/admin-messages", adminMessageRoutes);
app.use("/api/request", requestRoute);
app.use("/api/approved-budget", approvedBudgetRoute);

// **Default Route**
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
