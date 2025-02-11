import React, { useEffect, useMemo, useState } from "react";

export const DropdownStates = ({ estado, setNewState, disabled }) => {
  const [selectedState, setSelectedState] = useState(estado);
  const [isOpen, setIsOpen] = useState(false);

  const estados = ["Pendiente", "En proceso", "Completado", "Cancelado"];
  const colors = ["bg-yellow-400", "bg-blue-400", "bg-green-600", "bg-red-400"];

  useEffect(() => {
    setSelectedState(estado);
  }, [estado]);

  const handleSelect = (estado) => {
    setSelectedState(estado); // Actualiza el estado local
    setNewState(estado); // Notifica al padre con el nuevo estado
    setIsOpen(false); // Cierra el menú
  };

  return (
    <div className={"relative inline-block text-left p-0 m-0"}>
      <button
        className={`inline-flex w-full justify-between rounded-md 
            ${colors[estados.findIndex((a) => a === estado)]} 
            ${`${!disabled === false && " hover:cursor-not-allowed"}`}
            
            px-4 py-2 text-sm font-medium text-white shadow-sm  focus:ring-gray-500 focus:ring-1`}
        onClick={() =>
          disabled
            ? alert("Debe de editar primero el pedido!")
            : setIsOpen(!isOpen)
        }
      >
        {selectedState}
        <span
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {estados.map((estado, index) => (
            <li key={index}>
              <button
                className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-${colors[index]}`}
                onClick={() => handleSelect(estado)}
              >
                {estado}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
