const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const cors = require('cors');
const userRoutes = require("./routes/userRoute");
const paymentRoutes = require("./routes/payment");
const parentRoutes = require('./routes/parent')

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes); // Mount payment routes
app.use("/api/parents", parentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));