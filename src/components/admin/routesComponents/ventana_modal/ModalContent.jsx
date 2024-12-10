import { useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import ButtonComponent from "../../../web/ButtonComponent";
import {
  insertRoute,
  updateRequestsWithRoute,
} from "../../../../supabase/crudFunctions";

export default function ModalContent({
  onClose,
  domiciliarios,
  pedidos,
  reloadRoutes,
}) {
  const [total, setTotal] = useState(0);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [selectedDomiciliario, setSelectedDomiciliario] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pedidosOrdenados = [...pedidos].sort((a, b) => a - b);

  const handlePedidoChange = (pedido) => {
    setSelectedPedidos((prevSelected) =>
      prevSelected.includes(pedido)
        ? prevSelected.filter((p) => p !== pedido)
        : [...prevSelected, pedido]
    );
  };

  const handleSave = async () => {
    if (!selectedDomiciliario || total <= 0 || selectedPedidos.length === 0) {
      alert(
        "Por favor, selecciona un domiciliario, pedidos y un total válido."
      );
      return;
    }

    setIsLoading(true);

    try {
      // Creating 1 new route
      const routeData = await insertRoute({
        domiciliary: selectedDomiciliario.id,
        total: parseInt(total),
      });

      if (!routeData || routeData.length === 0) {
        throw new Error("No se pudo crear la ruta.");
      }
      const routeId = routeData[0].route_id; // getting id of the new route

      // Paso 2: Updating the selected requests
      const updatePromises = selectedPedidos.map((pedido) => {
        if (pedido === null) return "wtf";
        console.log("Pedido actualizado:", pedido);
        updateRequestsWithRoute({ requestId: pedido, routeId: routeId });
      });
      await Promise.all(updatePromises);

      alert("Ruta creada y solicitudes vinculadas con éxito.");
      reloadRoutes();
      onClose();
    } catch (error) {
      console.error("Error al guardar la ruta:", error);
      alert("Ocurrió un error al guardar la ruta.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDomiciliarioSelect = (domiciliario) => {
    setSelectedDomiciliario(domiciliario);
    setDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px] flex flex-col items-center relative">
        <button
          className="text-gray-500 hover:text-orange-400 absolute top-2 right-2"
          onClick={onClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl mb-2 font-bold">Crea una Nueva Ruta</h1>

        {/* Dropdown personalizado */}
        <div className="relative w-full mb-4">
          <button
            className="w-full flex justify-between items-center px-3 py-2 border rounded text-gray-700 bg-white"
            onClick={toggleDropdown}
          >
            {selectedDomiciliario?.name || "Selecciona un domiciliario"}{" "}
            {/* Mostrar el nombre seleccionado */}
            <ChevronDownIcon
              className={`h-5 w-5 transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute mt-1 w-full bg-white border rounded shadow-md z-10 max-h-40 overflow-y-scroll">
              {domiciliarios.map((domiciliario, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-gray-200"
                  onClick={() => handleDomiciliarioSelect(domiciliario)}
                >
                  {domiciliario.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 w-full">
          <h2 className="text-neutral-700 mb-2">Selecciona los pedidos:</h2>
          <div className="grid grid-cols-5 gap-3 max-h-[380px] overflow-y-scroll border rounded p-3">
            {pedidosOrdenados.map((pedido, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPedidos.includes(pedido)}
                  onChange={() => handlePedidoChange(pedido)}
                  className="form-checkbox h-5 w-5 text-orange-400"
                />
                <span className="text-gray-700">{pedido}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 mb-1 w-full">
          <label className="text-neutral-700" htmlFor="total">
            Total:
          </label>
          <input
            type="number"
            id="total"
            name="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mt-2 flex">
          <ButtonComponent
            title={isLoading ? "Guardando..." : "Guardar"}
            onClickButton={handleSave}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
