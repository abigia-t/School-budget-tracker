import React from "react";

const ActorTable = ({ actors = [], columns, handleEditActor, handleDeleteActor }) => {
  if (!Array.isArray(actors)) {
    console.error("Invalid actors data:", actors); // Debugging
    return <p className="text-red-500">Error: Actors data is invalid.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col) => (
            <th key={col.key} className="border px-4 py-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {actors.length > 0 ? (
          actors.map((actor) => (
            <tr key={actor._id} className="border">
              {columns.map((col) => (
                <td key={col.key} className="border px-4 py-2">
                  {col.key === "actions" ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditActor(actor)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteActor(actor);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    actor[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              No actors found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ActorTable;
