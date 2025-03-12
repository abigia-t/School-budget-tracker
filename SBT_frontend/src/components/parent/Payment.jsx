// frontend/src/components/ParentPayment.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const ParentPayment = () => {
  const [paymentData, setPaymentData] = useState({ children: [] });
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payments", {
          timeout: 5000, // Add a timeout to catch slow responses
        });
        console.log("Response data:", response.data); // Log successful response
        setPaymentData(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error details:", error);
        }
      }
    };
    fetchPayments();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (selectedPayments.length === 0) {
      setSubmissionStatus("Please select at least one payment.");
      return;
    }

    setSubmissionStatus("Initializing payment with Chapa...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/initialize",
        {
          selectedPayments,
          parentEmail: "parent@example.com", // Replace with dynamic data
          parentName: "Parent Name",
          parentPhone: "0912345678",
        }
      );

      if (response.data.status === "success") {
        setSubmissionStatus("Redirecting to Chapa payment...");
        window.location.href = response.data.checkout_url; // Redirect to Chapa checkout
      } else {
        setSubmissionStatus("Payment initialization failed.");
      }
    } catch (error) {
      setSubmissionStatus("An error occurred during payment processing.");
      console.error(error);
    }
  };

  const totalAmount = paymentData.children
    .filter((child) => selectedPayments.includes(child.id))
    .reduce((sum, child) => sum + child.amountDue, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Make a Payment with Chapa
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Select Payments
        </h2>
        <div className="space-y-4">
          {paymentData.children.map((child) => (
            <div
              key={child.id}
              className={`flex justify-between items-center p-4 rounded-lg ${
                child.paid ? "bg-gray-200" : "bg-green-50"
              }`}
            >
              <div className="flex items-center">
                {!child.paid && (
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(child.id)}
                    onChange={() => handleCheckboxChange(child.id)}
                    className="mr-3 h-5 w-5 text-green-600"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-800">{child.name}</p>
                  <p className="text-sm text-gray-600">Due: {child.dueDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  ETB {child.amountDue.toFixed(2)}
                </p>
                {child.paid && <p className="text-sm text-gray-500">Paid</p>}
              </div>
            </div>
          ))}
        </div>
        {selectedPayments.length > 0 && (
          <p className="mt-4 text-lg font-semibold text-gray-800">
            Total: ETB {totalAmount.toFixed(2)}
          </p>
        )}
      </div>

      {!paymentData.children.every((child) => child.paid) && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Pay with Chapa
          </h2>
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <p className="text-gray-600">
              Click Pay Now to proceed with payment via Chapa secure gateway.
            </p>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
              disabled={selectedPayments.length === 0}
            >
              Pay Now
            </button>
          </form>
          {submissionStatus && (
            <p
              className={`mt-4 text-center ${
                submissionStatus.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {submissionStatus}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentPayment;