const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Mock Employee Schema (Replace with your actual schema)
const employeeSchema = new mongoose.Schema({
  name: String,
  type: String, // Full-time, Part-time, Contractual
  basicSalary: Number,
  overtimeRate: Number,
  tax: Number,
  pension: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// Mock Attendance Schema (Replace with your actual schema)
const attendanceSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  hoursWorked: Number,
  overtimeHours: Number,
  absences: Number,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

// Fetch Employee Data
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// Fetch Attendance Data
app.get("/api/attendance/:employeeId", async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ employeeId: req.params.employeeId });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance data not found" });
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
});

// Approve Payroll
app.post("/api/payroll/approve", async (req, res) => {
  try {
    const { employeeId, payrollData } = req.body;
    // Save payroll approval to the database (Add your logic here)
    res.json({ message: "Payroll approved successfully", payrollData });
  } catch (error) {
    res.status(500).json({ message: "Error approving payroll", error });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});