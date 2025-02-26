import React, { useState } from "react";

const ManageActors = () => {
  // Mock data for now (replace this with fetched data later)
  const [actors, setActors] = useState([
    { id: 1, name: "John Doe", role: "General Manager", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Finance Head", email: "jane@example.com" },
    { id: 3, name: "Mike Brown", role: "System Admin", email: "mike@example.com" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Actors</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor, index) => (
              <tr key={actor.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{actor.name}</td>
                <td className="py-2 px-4">{actor.role}</td>
                <td className="py-2 px-4">{actor.email}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageActors;
