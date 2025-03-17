import React, { useState } from "react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import { addThousandSeparators } from "../../../utils/addThousandSeparators.js";

export default function CardRoute({ routeModel, domiciliaries }) {
  console.log("Ruta", routeModel);
  console.log("Domiciliarios", domiciliaries);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manejo del DropdownMenu que sale en cada card
  const [selectedStatus, setSelectedStatus] = useState(routeModel.status); // Estado de la ruta que puede ser cambiado en todo momento

  const statuses = ["En proceso", "Completado", "Cancelado"]; // Estados posibles de la ruta para el dropdown

  const filteredRequests = routeModel.requests; // Pedidos de la ruta

  const statusColors = {
    "En proceso": "bg-blue-400",
    Completado: "bg-green-600",
    Cancelado: "bg-red-400",
  };

  const domiciliaryName = domiciliaries.find(
    (domiciliary) => domiciliary.id === routeModel.domiciliary
  )?.name; // Nombre del domiciliario asignado a la ruta

  const toggleDropdown = () => {
    // Función para abrir y cerrar el dropdown
    console.log("Status", selectedStatus);
    setDropdownOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await routeModel.deleteRoute(); // Llamar a la función para eliminar en la base de datos
    } catch (error) {
      console.error("Error eliminando la ruta:", error);
    }
  };

  // Función para cambiar el estado de la ruta en la base de datos que se activa al seleccionar un estado del dropdown
  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    setDropdownOpen(false);
    console.log(
      "Cambiando estado de la ruta",
      routeModel.route_id,
      "a",
      newStatus
    );
    try {
      await routeModel.editStatus(newStatus);
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const colorClass = statusColors[selectedStatus] || "bg-red-400"; // Color de la card según el estado de la ruta

  return (
    <div
      className={`relative flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg transition-transform ${
        dropdownOpen ? "" : "hover:scale-105"
      } m-2 sm:m-3 w-full`}
    >
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* Contenido de la Card */}
      <div className="flex justify-between w-full">
        <p className="text-base font-semibold">{domiciliaryName}</p>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
          title="Eliminar ruta"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-start w-full">
        <p className="text-sm">
          Pedidos:{" "}
          {filteredRequests?.map((req) => req.request_id).join(", ") ||
            "Ninguno"}
        </p>
      </div>

      <div className="flex justify-between items-center w-full mt-2 relative">
        <p className="text-sm">
          Total: {addThousandSeparators(routeModel.total) || 0}
        </p>
        <div className="relative">
          <button
            className={`flex justify-between items-center px-3 py-2 border rounded text-white ${colorClass}`}
            onClick={toggleDropdown}
          >
            {selectedStatus}
            <ChevronDownIcon
              className={`h-5 w-5 ml-1 transform transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-gray-100 p-2 rounded-lg shadow-lg z-50 pointer-events-auto"
              style={{ position: "absolute" }}
            >
              {statuses.map(
                (status) =>
                  status !== selectedStatus && (
                    <button
                      key={status}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
                      onClick={() => handleStatusChange(status)}
                    >
                      {status}
                    </button>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}