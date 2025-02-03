import React, { useState } from "react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  updateRouteStatus,
  deleteRoute,
} from "../../../supabase/crudFunctions";
import { addThousandSeparators } from "../../../utils/addThousandSeparators.js";

export default function CardRoute({
  route,
  domiciliaryOptions,
  requestWithRoute,
  reloadData,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(route.status);

  const statuses = ["En proceso", "Completado", "Cancelado"];

  const selected = domiciliaryOptions.find((d) => d.id === route.domiciliary);
  const filteredRequests = requestWithRoute.filter(
    (request) => request.route_id === route.route_id
  );

  const statusColors = {
    "En proceso": "bg-blue-400",
    Completado: "bg-green-600",
    Cancelado: "bg-red-400",
  };

  const domiciliaryName = selected ? selected.name : "Sin asignar";

  const toggleDropdown = () => {
    console.log("Status", selectedStatus);
    setDropdownOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    console.log("Eliminando ruta", route.route_id);
    try {
      await deleteRoute({ id: route.route_id }); // Llamar a la función para eliminar en la base de datos
      reloadData(); // Recargar datos
    } catch (error) {
      console.error("Error eliminando la ruta:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    setDropdownOpen(false);
    console.log("Cambiando estado de la ruta", route.route_id, "a", newStatus);
    try {
      await updateRouteStatus({ id: route.route_id, status: newStatus }); // Llamar a la función para actualizar en la base de datos
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const colorClass = statusColors[selectedStatus] || "bg-red-400";

  return (
    <div
      className={`relative flex flex-col items-center p-6 rounded-lg shadow-lg transition-transform ${
        dropdownOpen ? "" : "hover:scale-105"
      } m-3 w-80`}
    >
      {/* Bloquear interacción con otras cards */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* Contenido de la Card */}
      <div className="flex justify-between w-full">
        <p className="text-base font-semibold">
          {domiciliaryName || "Sin asignar"}
        </p>
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
        <p className="text-sm">Total: {addThousandSeparators(route.total) || 0}</p>
        <div className="relative z-50">
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
