import { useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import ButtonComponent from "../../../web/ButtonComponent";
import {
  insertRoute,
  updateRoute_idRequest,
} from "../../../../supabase/crudFunctions";

export default function ModalContent({ onClose, domiciliarios, requests }) {
  const [total, setTotal] = useState(0);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [selectedDomiciliario, setSelectedDomiciliario] = useState({});

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const orderedRequests = requests.sort((a, b) => a.request_id - b.request_id);

  const requestsIds = requests.map((request) => request.request_id);

  const calculateTotal = (selectedPedidos) => {
    const selectedRequests = requests.filter((request) =>
      selectedPedidos.includes(request.request_id)
    );
    const totalAmount = selectedRequests.reduce(
      (acc, request) => acc + request.ConCuantoPago,
      0
    );
    setTotal(totalAmount);
  };

  const handlePedidoChange = (pedido) => {
    setSelectedPedidos((prevSelected) => {
      const newSelected = prevSelected.includes(pedido)
        ? prevSelected.filter((p) => p !== pedido)
        : [...prevSelected, pedido];
      calculateTotal(newSelected);
      return newSelected;
    });
  };

  const handleSave = async () => {
    if (!selectedDomiciliario || selectedPedidos.length === 0) {
      alert("Por favor, selecciona un domiciliario y pedido válido.");
      return;
    }

    setIsLoading(true);

    try {
      // Primero se crea la ruta y luego se actualizan los pedidos
      insertRoute({
        domiciliary: selectedDomiciliario.domiciliary_id,
        total: parseInt(total),
      })
        .then((routeData) => {
          if (!routeData || routeData.length === 0) {
            throw new Error("No se pudo crear la ruta.");
          }

          const routeId = routeData[0].route_id; // ID de la ruta creada con éxito

          // Paso 2: Actualizar los pedidos con el ID de la ruta creada
          const updatePromises = selectedPedidos.map((pedido) => {
            if (pedido === null) return Promise.resolve("wtf");
            console.log("Pedido actualizado:", pedido);
            return updateRoute_idRequest({
              id: pedido,
              routeId: routeId,
            });
          });

          return Promise.all(updatePromises);
        })
        .then(() => {
          alert("Ruta creada y solicitudes vinculadas con éxito.");
          onClose();
        })
        .catch((error) => {
          console.error("Error al guardar la ruta:", error);
          alert("Ocurrió un error al guardar la ruta.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error fuera del flujo de promesas:", error);
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

        <div className="relative w-full mb-4">
          <button
            className="w-full flex justify-between items-center px-3 py-2 border rounded text-gray-700 bg-white"
            onClick={toggleDropdown}
          >
            {selectedDomiciliario?.name || "Selecciona un domiciliario"}{" "}
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
            {orderedRequests.map((pedido, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPedidos.includes(pedido.request_id)}
                  onChange={() => handlePedidoChange(pedido.request_id)}
                  className="form-checkbox h-5 w-5 text-orange-400"
                />
                <span className="text-gray-700">{pedido.request_id}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 mb-1 w-full">
          <label className="text-neutral-700" htmlFor="total">
            Total:
          </label>
          <span className="text-neutral-700">${total}</span>
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
