import React, { useState, useEffect } from "react";
import axios from "axios";
import ActorTable from "../../components/ActorTable";
import ActorFormModal from "../../components/ActorFormModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const ManageActors = () => {
  const [actors, setActors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentActor, setCurrentActor] = useState(null);
  const [newActor, setNewActor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    axios
  .get("http://localhost:5000/api/actors")
  .then((response) => {
    console.log(response.data);
    setActors(Array.isArray(response.data) ? response.data : []);
  })
  .catch((error) => console.error("Error fetching actors:", error));

  }, []);

  const columns = [
    { key: "index", label: "#" }, // Automatically generated row number
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEditActor(row)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteActor(row)}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleAddActor = () => {
    setModalType("create");
    setNewActor({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      role: "",
    });
    setIsModalOpen(true);
  };

  const handleEditActor = (actor) => {
    setModalType("update");
    setCurrentActor(actor);
    setNewActor({ ...actor });
    setIsModalOpen(true);
  };

  const handleDeleteActor = (actor) => {
    setModalType("delete");
    setCurrentActor(actor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentActor(null);
  };

  const handleInputChange = ({ target: { name, value } }) =>
    setNewActor((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = () => {
    if (modalType === "create") {
      axios
  .post("http://localhost:5000/api/actors", newActor)
  .then((response) => {
    setActors([...actors, response.data]);
    setIsModalOpen(false);
  })
  .catch((error) => console.error("Error creating actor:", error));

    } else if (modalType === "update") {
      axios
  .put(`http://localhost:5000/api/actors/${currentActor._id}`, newActor)
  .then(() => {
    setActors((prev) =>
      prev.map((actor) =>
        actor._id === currentActor._id ? { ...actor, ...newActor } : actor
      )
    );
    setIsModalOpen(false);
  })
  .catch((error) => console.error("Error updating actor:", error));

    }
  };

  const handleDelete = () => {
    axios
    .delete(`http://localhost:5000/api/actors/${currentActor._id}`)
    .then(() => {
      setActors((prev) => prev.filter((actor) => actor._id !== currentActor._id));
      setIsModalOpen(false);
    })
    .catch((error) => console.error("Error deleting actor:", error));
  
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Actor List</h2>
        <button
          onClick={handleAddActor}
          className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
        >
          + New Actor
        </button>
      </div>
      <ActorTable
        actors={actors.map((actor, index) => ({ ...actor, index: index + 1 }))}
        columns={columns}
        handleEditActor={handleEditActor}
        handleDeleteActor={handleDeleteActor}
      />
      <ActorFormModal
        isOpen={isModalOpen && modalType !== "delete"}
        modalType={modalType}
        newActor={newActor}
        handleInputChange={handleInputChange}
        handleModalClose={handleModalClose}
        handleSubmit={handleSubmit}
      />
      <DeleteConfirmationModal
        isOpen={isModalOpen && modalType === "delete"}
        actor={currentActor}
        handleModalClose={handleModalClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ManageActors;
