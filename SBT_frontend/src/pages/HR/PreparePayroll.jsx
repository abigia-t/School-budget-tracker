import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Select, MenuItem, Button, Paper, Grid } from "@mui/material";

const PreparePayroll = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [payrollData, setPayrollData] = useState({
    basicSalary: 0,
    overtime: 0,
    deductions: 0,
    netSalary: 0,
  });
  const [isApproved, setIsApproved] = useState(false);

  // Fetch employee data
  useEffect(() => {
    axios.get("/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Fetch attendance data
  useEffect(() => {
    if (selectedEmployee) {
      axios.get(`/api/attendance/${selectedEmployee.id}`)
        .then((response) => setAttendanceData(response.data))
        .catch((error) => console.error("Error fetching attendance:", error));
    }
  }, [selectedEmployee]);

  // Calculate payroll
  const calculatePayroll = () => {
    if (selectedEmployee) {
      const { basicSalary, overtimeRate } = selectedEmployee;
      const { hoursWorked, overtimeHours, absences } = attendanceData;

      const overtimePay = overtimeHours * overtimeRate;
      const absenceDeductions = absences * (basicSalary / 30);
      const totalDeductions = absenceDeductions + selectedEmployee.tax + selectedEmployee.pension;
      const netSalary = basicSalary + overtimePay - totalDeductions;

      setPayrollData({
        basicSalary,
        overtime: overtimePay,
        deductions: totalDeductions,
        netSalary,
      });
    }
  };

  // Handle employee selection
  const handleEmployeeSelect = (e) => {
    setSelectedEmployee(JSON.parse(e.target.value));
  };

  // Handle payroll approval
  const handleApprove = () => {
    axios.post("/api/payroll/approve", { employeeId: selectedEmployee.id, payrollData })
      .then(() => setIsApproved(true))
      .catch((error) => console.error("Error approving payroll:", error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Prepare Payroll</Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Select fullWidth onChange={handleEmployeeSelect} value={selectedEmployee ? JSON.stringify(selectedEmployee) : ""}>
              <MenuItem value="">Select an employee</MenuItem>
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={JSON.stringify(employee)}>
                  {employee.name} ({employee.type})
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {selectedEmployee && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6">Attendance Data</Typography>
                <Typography>Hours Worked: {attendanceData.hoursWorked}</Typography>
                <Typography>Overtime Hours: {attendanceData.overtimeHours}</Typography>
                <Typography>Absences: {attendanceData.absences}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Payroll Details</Typography>
                <Button variant="contained" color="primary" onClick={calculatePayroll}>Calculate Payroll</Button>
                <Typography>Basic Salary: ${payrollData.basicSalary}</Typography>
                <Typography>Overtime: ${payrollData.overtime}</Typography>
                <Typography>Deductions: ${payrollData.deductions}</Typography>
                <Typography>Net Salary: ${payrollData.netSalary}</Typography>
              </Grid>

              {!isApproved && (
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" onClick={handleApprove}>Approve Payroll</Button>
                </Grid>
              )}

              {isApproved && (
                <Grid item xs={12}>
                  <Typography color="primary">Payroll approved successfully!</Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default PreparePayroll;