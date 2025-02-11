/* eslint-disable react/prop-types */
import { Request } from "./Request";

export function RequestsList({
  filteredPedidos,
  handleRequestSelection,
  selectedPedido,
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
