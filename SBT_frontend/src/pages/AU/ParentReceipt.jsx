import React, { useState, useEffect } from "react";

const ParentReceipt = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Emma", grade: "Grade 3", receipt: "/images/receipt1.png", status: "Pending" },
    { id: 2, name: "Liam", grade: "Grade 4", receipt: "/images/receipt2.png", status: "Pending" },
    { id: 3, name: "Sophia", grade: "Grade 2", receipt: "/images/receipt3.png", status: "Pending" },
  ]);

  // Simulate the approval/rejection process
  const handleApproval = (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, status: "Approved" } : student
    );
    setStudents(updatedStudents);
  };

  const handleRejection = (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, status: "Rejected" } : student
    );
    setStudents(updatedStudents);
  };

  useEffect(() => {
    // Fetch student data from the backend
    // For now, mock data is used
    // const fetchData = async () => {
    //   const response = await fetch('/api/receipts');
    //   const data = await response.json();
    //   setStudents(data);
    // };
    // fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Parent Payment Receipts
      </h1>

      {/* Student Receipts List */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Receipts</h2>
        <div className="space-y-6">
          {students.length === 0 ? (
            <p className="text-center text-gray-600">No receipts available.</p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="p-4 bg-blue-50 rounded-lg flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">
                    {student.name} (ID: {student.id})
                  </p>
                  <p className="text-sm text-gray-600">Grade: {student.grade}</p>
                </div>

                {/* Display receipt image */}
                <div className="flex items-center">
                  {student.receipt ? (
                    <img
                      src={student.receipt}
                      alt={`${student.name} receipt`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">No receipt available</p>
                  )}
                </div>

                {/* Approval and Rejection Buttons */}
                <div className="flex space-x-4">
                  {student.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleApproval(student.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejection(student.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <p
                      className={`font-semibold ${student.status === "Approved" ? "text-green-600" : "text-red-600"}`}
                    >
                      {student.status}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentReceipt;