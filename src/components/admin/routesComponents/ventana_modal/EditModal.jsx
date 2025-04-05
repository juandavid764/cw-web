import React, { useState, useEffect } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import ButtonComponent from "../../../web/ButtonComponent";

const EditModal = ({ routeModel, onClose, domiciliarios, requests }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDomiciliario, setSelectedDomiciliario] = useState({});
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [combinedRequests, setCombinedRequests] = useState([]); //Este es un nuevo estado que se me ocurrio para poder tener las request que nos pasan y la de la ruta juntas

  // Obtener domiciliario inicial
  const getInitialDomiciliario = () => {
    return domiciliarios.find(
      (domiciliary) => domiciliary.domiciliary_id === routeModel.domiciliary
    );
  };

  //Detectar pedidos faltantes en requests (sin esto se me metian varias veces los mismos pedidos)
  const getMissingRequests = () => {
    return routeModel.requests.filter(
      (reqModel) =>
        !requests.some((req) => req.request_id === reqModel.request_id)
    );
  };

  // La fucking calcular total
  const calculateTotal = (selected) => {
    const selectedReqs = combinedRequests.filter((req) =>
      selected.includes(req.request_id)
    );
    const totalAmount = selectedReqs.reduce(
      (acc, req) => acc + req.ConCuantoPago,
      0
    );
    setTotal(totalAmount);
  };

  // Efecto para inicializar el domiciliario y los pedidos seleccionados y así por fin mostrar el total
  useEffect(() => {
    const initial = getInitialDomiciliario();
    if (initial) setSelectedDomiciliario(initial);

    const pedidosIds = routeModel.requests.map((req) => req.request_id);
    setSelectedPedidos(pedidosIds);

    const mergedRequests = [...requests, ...getMissingRequests()];
    setCombinedRequests(mergedRequests);

    calculateTotal(pedidosIds);
  }, [domiciliarios, routeModel, requests]);

  //Este useEffect fue usado para poder actualizar el total con los pedidos iniciales, porque haciendolo desde el useEffect anterior no pasaba porque no alcanza a cambiar el estado de los pedidos combinados
  useEffect(() => {
    if (combinedRequests.length > 0 && selectedPedidos.length > 0) {
      calculateTotal(selectedPedidos);
    }
  }, [combinedRequests]);

  // Guardar cambios con las funciones del modelo
  const handleSave = async () => {
    setIsLoading(true);
    const reqsToSend = combinedRequests.filter((req) =>
      selectedPedidos.includes(req.request_id)
    );

    try {
      await routeModel.editDomicliary(selectedDomiciliario.domiciliary_id);
      await routeModel.editRequests(reqsToSend);
      onClose();
    } catch (error) {
      console.error("Error al guardar la ruta:", error);
      alert("Ocurrió un error al guardar la ruta.");
    } finally {
      setIsLoading(false);
    }
  };

  // De aqui pa abajo todos los handlers de los eventos
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleDomiciliarioSelect = (domiciliario) => {
    setSelectedDomiciliario(domiciliario);
    setDropdownOpen(false);
  };

  const handlePedidoChange = (pedidoId) => {
    setSelectedPedidos((prev) => {
      const updated = prev.includes(pedidoId)
        ? prev.filter((p) => p !== pedidoId)
        : [...prev, pedidoId];

      calculateTotal(updated);
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px] flex flex-col items-center relative">
        {/* Botón de cierre */}
        <button
          className="text-gray-500 hover:text-orange-400 absolute top-2 right-2"
          onClick={onClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Título */}
        <h1 className="text-2xl mb-2 font-bold">
          Actualiza la ruta #{routeModel.route_id}
        </h1>

        {/* Dropdown domiciliario */}
        <div className="relative w-full mb-4">
          <button
            className="w-full flex justify-between items-center px-3 py-2 border rounded text-gray-700 bg-white"
            onClick={toggleDropdown}
          >
            {selectedDomiciliario?.name || "Selecciona un domiciliario"}
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

        {/* pedios */}
        <div className="mt-3 w-full">
          <h2 className="text-neutral-700 mb-2">Selecciona los pedidos:</h2>
          <div className="grid grid-cols-5 gap-3 max-h-[380px] overflow-y-scroll border rounded p-3">
            {combinedRequests.map((pedido, index) => (
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

        {/* Total */}
        <div className="flex items-center gap-2 mt-3 mb-1 w-full">
          <label className="text-neutral-700" htmlFor="total">
            Total:
          </label>
          <span className="text-neutral-700">${total}</span>
        </div>

        <div className="flex justify-end mt-4 w-full">
          <ButtonComponent
            title={isLoading ? "Guardando..." : "Guardar"}
            onClickButton={handleSave}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
