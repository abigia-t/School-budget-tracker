import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import StudentTable from "../../components/StudentTable";  // Custom table component
import StudentFormModal from "../../components/StudentFormModal"; // Reusable form modal
import DeleteStudentConfirmationModal from "../../components/DeleteStudentConfirmationModal "

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // Can be "create" or "edit"
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);  // Track delete modal state

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch students.");
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

  const handleDeleteStudent = (student) => {
    setCurrentStudent(student);  // Set current student to delete
    setIsDeleteModalOpen(true);  // Open delete confirmation modal
  };

  const confirmDeleteStudent = async () => {
    try {
      await axios.delete(`/api/students/${currentStudent._id}`);
      setStudents((prev) => prev.filter((s) => s._id !== currentStudent._id));
      setIsDeleteModalOpen(false);  // Close the delete confirmation modal
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete student.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);  // Close delete confirmation modal
  };

  const handleSubmit = async (newStudent) => {
    if (modalType === "create") {
      try {
        const res = await axios.post("/api/students/register", newStudent);
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
        Register Students
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
      <DeleteStudentConfirmationModal
        isOpen={isDeleteModalOpen}
        student={currentStudent}
        handleModalClose={handleModalClose}
        handleDelete={confirmDeleteStudent}
      />
    </div>
  );
};

export default ManageStudents;
