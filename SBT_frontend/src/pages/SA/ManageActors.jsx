import React, { useState, useEffect } from "react";
import axios from "axios";
import ActorTable from "../../components/ActorTable";
import ActorFormModal from "../../components/ActorFormModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { toast } from "react-toastify";

const ManageActors = () => {
  const [actors, setActors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentActor, setCurrentActor] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  
  const [newActor, setNewActor] = useState({firstName: "",lastName: "",email: "",password: "",phoneNumber: "",address: "",role: ""});
  // Define the columns for the ActorTable
  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "role", label: "Role" },
    { key: "actions",
      label: "Actions",
      render: (actor) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditActor(actor)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteActor(actor)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  
  const validateInputs = () => {
    let errors = {};
  
    if (!newActor.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!newActor.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!newActor.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(newActor.email)) {
      errors.email = "Invalid email format.";
    }
    if (!newActor.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    }
    if (!newActor.address.trim()) {
      errors.address = "Address is required.";
    }
    if (!newActor.role.trim()) {
      errors.role = "Role is required.";
    }
  
    if (modalType === "create") {
      if (!newActor.password.trim()) {
        errors.password = "Password is required.";
      } else if (newActor.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      }
    }
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const handleInputChange = ({ target: { name, value } }) => {
    setNewActor((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" })); // Clear validation error on input change
  };

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/actors", {
        });
        setActors(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching actors:", error);
        toast.error("Can't fetch data.")
      }
    };
  
    fetchActors();
  }, []);
  
  const handleSubmit = () => {
    if (!validateInputs()) {
      console.log("Validation failed!"); // Debugging
      return;
    }

    if (modalType === "create") {
      console.log("Submitting Actor:", newActor);
      axios.post("http://localhost:5000/api/actors/register", newActor, {})
  .then((response) => {
    setActors([...actors, response.data]);
    setIsModalOpen(false);
    toast.success("Actor added successfully!");
    console.log("Actor Created:", response.data);
  })
  .catch((error) => {
    console.error("Error creating actor:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to create actor.");
  });
    } 
    
    
    else if (modalType === "update") {
      const { _id, createdAt, updatedAt, ...filteredActor } = newActor;
    
      axios
        .put(`http://localhost:5000/api/actors/${currentActor._id}`, filteredActor)
        .then((res) => {
          const updatedActor = res.data.actor; // Get updated data from the server
          setActors((prev) =>
            prev.map((actor) =>
              actor._id === currentActor._id ? updatedActor : actor
            )
          );
          setIsModalOpen(false);
          toast.success("Actor updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating actor:", error);
          toast.error("Failed to update actor.");
        });
    }
    
    



    else if(modalType==="delete"){
      axios.delete(`http://localhost:5000/api/actors/${currentActor._id}`)
      .then(() => {
        setActors(actors.filter((actor) => actor._id !== currentActor._id));
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error delete actor:", error.response || error.message || error);
        toast.error("Failed to delete actor.");
      });   
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Actor List</h2>
        <button
  onClick={() => {
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
    setValidationErrors({});
    setIsModalOpen(true);
  }}
  className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
>
  + New staff
</button>

      </div>
      <ActorTable 
        actors={actors} 
        columns={columns} 

        handleEditActor={(actor) => {
          setModalType("update");
          setCurrentActor(actor);
          setNewActor({ ...actor, password: "" }); // Do not auto-fill password
          setIsModalOpen(true);
        }} 

        handleDeleteActor={(actor) => {
          setModalType("delete");
          setCurrentActor(actor);
          setIsModalOpen(true);
        }} 
      />
      <ActorFormModal
        isOpen={isModalOpen && modalType !== "delete"}
        modalType={modalType}
        newActor={newActor}
        handleInputChange={handleInputChange}
        handleModalClose={() => setIsModalOpen(false)}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />
      <DeleteConfirmationModal 
        isOpen={isModalOpen && modalType === "delete"} 
        actor={currentActor} 
        handleModalClose={() => setIsModalOpen(false)} 
        handleDelete={() => {
          axios.delete(`http://localhost:5000/api/actors/${currentActor._id}`)
            .then(() => {
              setActors(actors.filter((actor) => actor._id !== currentActor._id));
              setIsModalOpen(false);
              toast.success("Actor deleted successfully!");
            })
            .catch((error) => console.error("Error deleting actor:", error));
        }} 
      />
    </div>
  );
};

export default ManageActors;