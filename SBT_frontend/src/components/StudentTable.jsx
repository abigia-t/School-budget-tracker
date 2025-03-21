import React from "react";

const StudentTable = ({ students, handleEditStudent, handleDeleteStudent }) => {
  const columns = [
    { key: "studentId", label: "Student ID" },
    { key: "firstName", label: "First Name" },
    { key: "middleName", label: "Middle Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "actions", label: "Actions", render: (student) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditStudent(student)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteStudent(student)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-2">{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-2">
                {column.render ? column.render(student) : student[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;