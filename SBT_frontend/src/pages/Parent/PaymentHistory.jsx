import { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { _id: id } = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/payments/${id}`
        );
        setPayments(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-blue-500 text-3xl font-bold">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-red-500 text-3xl font-bold">{error}</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Payment History
      </h1>

      {/* Payment History Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Past Payments
        </h2>
        {payments.length === 0 ? (
          <p className="text-gray-600 text-center">
            No payment history available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 font-semibold text-gray-700">
                    Student ID
                  </th>
                  <th className="p-4 font-semibold text-gray-700">
                    Amount (ETB)
                  </th>
                  <th className="p-4 font-semibold text-gray-700">Date Paid</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-800">{payment.studentId}</td>
                    <td className="p-4 text-gray-800">
                      {payment.amount.toFixed(2)}
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{payment.txRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {payments.length > 0 && (
          <p className="mt-4 text-sm text-gray-500">
            Total Payments: {payments.length} | Total Amount: ETB{" "}
            {payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
