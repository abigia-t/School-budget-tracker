<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import Modal from "../../components/Modal"; // Import the Modal component

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'create', 'update', 'delete'
  const [currentStudent, setCurrentStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    id:"",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "",
  });

  // Fetch students from backend
  useEffect(() => {
    axios.get("/api/students").then((response) => setStudents(response.data)).catch((error) =>
        console.error("There was an error fetching students:", error)
      );
  }, []);

  const columns = [
    { key: "id", label: "Student Id" },
    { key: "fullName", label: "Full Name" }, // Corrected key
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "role", label: "Role" },
    { key: "actions", label: "Actions",
      render: (row) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEditStudent(row)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteStudent(row)}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleAddStudent = () => {
    setModalType("create");
    setNewStudent({
      id:"",
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      role: "",
    });
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setModalType("update");
    setCurrentStudent(student);
    setNewStudent({
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      password: student.password,
      phoneNumber: student.phoneNumber,
      address: student.address,
      role: student.role,
    });
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (student) => {
    setModalType("delete");
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  const handleInputChange = ({ target: { name, value } }) =>
    setNewActor((prev) => ({ ...prev, [name]: value }));
  

  const handleSubmit = () => {
    if (modalType === "create") {
      axios
        .post("/api/students", newStudent)
        .then((response) => {
          setStudents((prevStudents) => [
            ...prevStudents,
            { id: response.data.id, ...newStudent },
          ]);
        })
        .catch((error) =>console.error("There was an error creating the student:", error));
    } else if (modalType === "update") {
      axios
        .put(`/api/students/${currentStudent.id}`, newStudent)
        .then(() => {
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.id === currentStudent.id
                ? { ...student, ...newStudent }
                : student
            )
          );
          setIsModalOpen(false); // Close modal after updating
        })
        .catch((error) =>
          console.error("There was an error updating the student:", error)
        );
    }
    setNewStudent({
      id:"",
      fullName: "",
      email: "",
      password:"",
      phoneNumber: "",
      address: "",
      role: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`/api/students/${currentStudent.id}`)
      .then(() => {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== currentStudent.id)
        );
        setIsModalOpen(false);
      })
      .catch((error) =>console.error("There was an error deleting the student:", error));
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Student List</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded"
          />
          <button
            onClick={handleAddStudent}
            className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
          >
            + New Student
          </button>
        </div>
      </div>
      <Table columns={columns} data={students} />

      {/* Modal for creating/updating student */}
      <Modal
        isOpen={isModalOpen && (modalType === "create" || modalType === "update")}
        title={modalType === "create" ? "Register New Student" : "Update Student"}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        submitButtonText={modalType === "create" ? "Save" : "Update"}
      >
        <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">  
        <div>
            <label className="block text-gray-700">Student Id</label>
            <input
              type="text"
              name="id"
              value={newStudent.id}
              onChange={handleInputChange}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={newStudent.fullName}
              onChange={handleInputChange}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                className="border px-3 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={newStudent.password} // Corrected value
                onChange={handleInputChange}
                className="border px-3 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone number</label>
              <input
                type="number"
                name="phoneNumber"
                value={newStudent.phoneNumber} // Corrected value
                onChange={handleInputChange}
                className="border px-3 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={newStudent.address} // Corrected value
                onChange={handleInputChange}
                className="border px-3 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={newStudent.role} // Corrected value
                onChange={handleInputChange}
                className="border px-3 py-1 rounded w-full"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen && modalType === "delete"}
        title="Delete Student"
        onClose={handleModalClose}
        onSubmit={handleDelete}
        submitButtonText="Delete"
      >
        <p>Are you sure you want to delete {currentStudent?.fullName}?</p>
      </Modal>
=======
import React from "react";

const ManageStudents = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Students</h1>
      <p>Manage student accounts and records.</p>
>>>>>>> 0843dfc8de6351e51fe10f1378eae429a33d62fb
    </div>
  );
};

export default ManageStudents;
