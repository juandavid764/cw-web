import React, { useState } from "react";
import {
  ChevronDownIcon,
  TrashIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { addThousandSeparators } from "../../../utils/addThousandSeparators.js";
import EditModal from "./ventana_modal/EditModal";

export default function CardRoute({ routeModel, domiciliaries, requests }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(routeModel.status);
  const [modalOpen, setModalOpen] = useState(false);
  const statuses = ["En proceso", "Completado", "Cancelado"];

  const filteredRequests = routeModel.requests;
  const formattedTime = routeModel.time.substring(0, 5);

  const statusColors = {
    "En proceso": "bg-blue-500",
    Completado: "bg-green-600",
    Cancelado: "bg-red-500",
  };

  const statusTextColors = {
    "En proceso": "text-blue-500",
    Completado: "text-green-600",
    Cancelado: "text-red-500",
  };

  const domiciliaryName = domiciliaries.find(
    (domiciliary) => domiciliary.domiciliary_id == routeModel.domiciliary
  )?.name;

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await routeModel.deleteRoute();
    } catch (error) {
      console.error("Error eliminando la ruta:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    setDropdownOpen(false);
    try {
      await routeModel.editStatus(newStatus);
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const colorClass = statusColors[selectedStatus] || "bg-red-500";
  const textColorClass = statusTextColors[selectedStatus] || "text-red-500";

  return (
    <>
      <div
        className={`relative flex flex-col p-4 rounded-lg shadow-md bg-white transition-all hover:shadow-lg border-l-4 ${colorClass} cursor-pointer m-2 max-w-md mx-auto w-full`}
        onClick={toggleModal}
      >
        {/* Header con nombre y hora */}
        <div className="flex justify-between items-center w-full mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold text-gray-800 truncate max-w-[180px]">
              {domiciliaryName}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{formattedTime}</span>
            </div>
            <button
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={handleDelete}
              title="Eliminar ruta"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Detalles de pedidos */}
        <div className="grid grid-cols-2 gap-4 my-3">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500 font-medium">Pedidos</p>
            <p className="text-sm font-semibold text-gray-700">
              {filteredRequests?.map((req) => req.request_id).join(", ") || "0"}
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500 font-medium">Total</p>
            <p className="text-sm font-semibold text-gray-700">
              {addThousandSeparators(routeModel.total) || "0"}
            </p>
          </div>
        </div>

        {/* Estado */}
        <div className="flex justify-end items-center mt-2 relative">
          <div className="relative">
            <button
              className={`flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium ${colorClass} text-white hover:opacity-90 transition-opacity`}
              onClick={toggleDropdown}
            >
              <span>{selectedStatus}</span>
              <ChevronDownIcon
                className={`h-4 w-4 ml-2 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
                {statuses.map(
                  (status) =>
                    status !== selectedStatus && (
                      <button
                        key={status}
                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${statusTextColors[status]}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(status);
                        }}
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

      {modalOpen && (
        <EditModal
          routeModel={routeModel}
          onClose={toggleModal}
          domiciliarios={domiciliaries}
          requests={requests}
        />
      )}
    </>
  );
}
