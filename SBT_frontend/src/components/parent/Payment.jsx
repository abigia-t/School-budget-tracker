import { useState } from "react";
import axios from "axios";

const ParentPayment = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to determine the base tuition fee based on grade
  const calculatePaymentAmount = (grade) => {
    if (grade === "KG1") return 500;
    if (["KG2", "KG3"].includes(grade)) return 350;
    if (
      ["Grade1", "Grade2", "Grade3", "Grade4", "Grade5", "Grade6"].includes(
        grade
      )
    )
      return 300;
    return 0;
  };

  // Function to fetch student details
  const handleFetchStudent = async (e) => {
    e.preventDefault();
    const id = e.target.id.value.trim();
    if (!id) {
      setError("Please enter a valid Student ID.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/${id}`
      );
      const student = response.data;

      // Calculate base fee
      const baseFee = calculatePaymentAmount(student.grade);

      // Calculate late fee (if past 10th day of the month)
      const today = new Date().getDate();
      const penalty = today > 10 ? 50 : 0;

      setStudentData(student);
      setPaymentAmount(baseFee);
      setLateFee(penalty);
      setTotalAmount(baseFee + penalty);
    } catch (error) {
      setError("Student not found.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Parent Payment Portal
      </h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Student Search Form */}
      {!studentData && (
        <form
          onSubmit={handleFetchStudent}
          className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <label htmlFor="id" className="block text-gray-700 font-medium">
            Enter Student ID
          </label>
          <input
            name="id"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      )}

      {/* Student Details & Payment Form */}
      {studentData && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Student Details
          </h2>
          <p className="text-gray-800">
            <strong>Name:</strong> {studentData.firstName}{" "}
            {studentData.middleName} {studentData.lastName}
          </p>
          <p className="text-gray-800">
            <strong>Email:</strong> {studentData.email}
          </p>
          <p className="text-gray-800">
            <strong>Phone:</strong> {studentData.phoneNumber}
          </p>
          <p className="text-gray-800">
            <strong>Grade:</strong> {studentData.grade}
          </p>

          {/* Payment Form */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Payment Details
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Base Tuition Fee:
                </span>
                <span className="font-semibold">ETB {paymentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Late Fee (if applicable):
                </span>
                <span className="font-semibold text-red-500">
                  ETB {lateFee}
                </span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span>ETB {totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => alert("payment beggins")}
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentPayment;
