import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import StudentTable from "../../components/StudentTable";  // Custom table component
import axios from "axios";
import StudentFormModal from "../../components/StudentFormModal"; // Reusable form modal

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // Can be "create" or "edit"
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        toast.error("Invalid data format from API");
      }
    } catch (error) {
      toast.error("Failed to fetch students.");
    }
  };

  const handleAddStudent = () => {
    setModalType("create");
    setCurrentStudent(null);  // Reset current student for creating new one
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setModalType("edit");
    setCurrentStudent(student);  // Set current student for editing
    setIsModalOpen(true);
  };

  const handleDeleteStudent = async (student) => {
    try {
      await axios.delete(`/api/students/${student._id}`);
      setStudents((prev) => prev.filter((s) => s._id !== student._id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete student.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (newStudent) => {
    if (modalType === "create") {
      try {
        const res = await axios.post("/api/students", newStudent);
        setStudents((prev) => [...prev, res.data]);
        toast.success("Student added successfully!");
      } catch (error) {
        toast.error("Failed to add student.");
      }
    } else if (modalType === "edit") {
      try {
        const res = await axios.put(`/api/students/${currentStudent._id}`, newStudent);
        setStudents((prev) =>
          prev.map((student) =>
            student._id === currentStudent._id ? res.data : student
          )
        );
        toast.success("Student updated successfully!");
      } catch (error) {
        toast.error("Failed to update student.");
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
      <button
        onClick={handleAddStudent}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
      >
        Add Student
      </button>
      <StudentTable
        students={students}
        handleEditStudent={handleEditStudent}
        handleDeleteStudent={handleDeleteStudent}
      />
      <StudentFormModal
        isOpen={isModalOpen}
        modalType={modalType}
        currentStudent={currentStudent}
        handleModalClose={handleModalClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManageStudents;
