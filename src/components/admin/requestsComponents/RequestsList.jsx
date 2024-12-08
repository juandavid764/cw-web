/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";
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
      {/* Lista de pedidos */}
      <div className="space-y-4 py-2">
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
