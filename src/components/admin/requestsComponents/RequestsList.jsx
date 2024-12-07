/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Request } from "./Request";
import { useState } from "react";

export function RequestsList({
  filteredPedidos,
  handleRequestSelection,
  selectedPedido,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <>
      <h3 className="text-lg font-medium mb-4">Pedidos</h3>
      {/* Campo de búsqueda */}
      <div className="mb-4">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar pedidos..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>
      {/* Lista de pedidos */}
      <div className="space-y-4 m- p-0">
        {filteredPedidos.map((pedido, index) => (
          <Request
            key={index}
            pedido={pedido}
            handleRequestSelection={handleRequestSelection}
            selectedPedido={selectedPedido}
          />
        ))}
      </div>
    </>
  );
}
