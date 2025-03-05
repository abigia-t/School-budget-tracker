import React from "react";

const ActorTable = ({ actors, columns, handleEditActor, handleDeleteActor }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col) => (
            <th key={col.key} className="border px-4 py-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {actors.map((actor) => (
          <tr key={actor.id} className="border">
            {columns.map((col) => (
              <td key={col.key} className="border px-4 py-2">
                {col.render ? col.render(actor) : actor[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActorTable;

