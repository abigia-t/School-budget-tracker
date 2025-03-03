import { useState } from "react";

// Mock Chapa SDK import (replace with actual Chapa SDK import)
const Chapa = {
  initialize: ({
    tx_ref,
    amount,
    currency,
    callback_url,
    return_url,
    customer,
  }) =>
    new Promise((resolve) => {
      // Simulate Chapa payment initialization
      setTimeout(() => resolve({ status: "success", tx_ref }), 1000);
    }),
  verify: (tx_ref) =>
    new Promise((resolve) => {
      // Simulate payment verification
      setTimeout(() => resolve({ status: "success" }), 1000);
    }),
};

const ParentPayment = () => {
  const [paymentData, setPaymentData] = useState({
    children: [
      {
        id: 1,
        name: "Emma",
        amountDue: 50.0,
        dueDate: "2025-03-10",
        paid: false,
      },
      {
        id: 2,
        name: "Liam",
        amountDue: 50.0,
        dueDate: "2025-03-15",
        paid: false,
      },
    ],
  });

  const [selectedPayments, setSelectedPayments] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle payment with Chapa
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (selectedPayments.length === 0) {
      setSubmissionStatus("Please select at least one payment.");
      return;
    }

    const totalAmount = paymentData.children
      .filter((child) => selectedPayments.includes(child.id))
      .reduce((sum, child) => sum + child.amountDue, 0);

    const tx_ref = `tx-${Date.now()}`; // Unique transaction reference
    const paymentDetails = {
      tx_ref,
      amount: totalAmount,
      currency: "ETB", // Ethiopian Birr
      callback_url: "https://yourdomain.com/callback", // Replace with your callback URL
      return_url: "https://yourdomain.com/return", // Replace with your return URL
      customer: {
        name: "Parent Name", // Replace with dynamic parent data
        email: "parent@example.com",
      },
    };

    setSubmissionStatus("Initializing payment with Chapa...");

    try {
      // Initialize payment with Chapa
      const initResponse = await Chapa.initialize(paymentDetails);
      if (initResponse.status === "success") {
        setSubmissionStatus("Processing payment...");

        // Simulate redirect or handle payment flow (Chapa typically provides a checkout URL)
        // For real integration, redirect to initResponse.checkout_url or use Chapa's JS SDK

        // Verify payment (after user completes payment)
        const verifyResponse = await Chapa.verify(tx_ref);
        if (verifyResponse.status === "success") {
          setPaymentData((prev) => ({
            ...prev,
            children: prev.children.map((child) =>
              selectedPayments.includes(child.id)
                ? { ...child, paid: true }
                : child
            ),
          }));
          setSubmissionStatus("Payment successful!");
          setSelectedPayments([]);
        } else {
          setSubmissionStatus("Payment verification failed.");
        }
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

      {/* Payment List Card */}
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

      {/* Payment Form Card */}
      {!paymentData.children.every((child) => child.paid) && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Pay with Chapa
          </h2>
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <p className="text-gray-600">
              Click "Pay Now" to proceed with payment via Chapa's secure
              gateway.
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
