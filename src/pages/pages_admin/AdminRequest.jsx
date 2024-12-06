import React, { useEffect, useMemo, useRef, useState } from "react";
import { getFormatRequest } from "../../supabase/nativeQuerys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes, faCopy, faSearch } from "@fortawesome/free-solid-svg-icons";

const AdminRequest = () => {
  const buttons = [
    { id: 0, label: "Todos" },
    { id: 1, label: "Pendiente" },
    { id: 2, label: "En proceso" },
    { id: 3, label: "Completado" },
    { id: 4, label: "Cancelado" },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [formattedRequest, setFormattedRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el texto de búsqueda

  const clientDataRef = useRef();
  const productDataRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const data = await getFormatRequest();
      setFormattedRequest(data || []);
    }
    fetchData();
  }, []);

  const filteredPedidos = useMemo(() => {
    return formattedRequest.filter((pedido) => {
      const matchesStatus =
        selectedBtn === 0 || pedido.status === buttons[selectedBtn].label;
      const matchesSearch = pedido.client
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [formattedRequest, selectedBtn, searchTerm]);

  useEffect(() => {
    if (filteredPedidos.length === 0) {
      clientDataRef.current.value = "";
      productDataRef.current.value = "";
    }
  }, [filteredPedidos]);

  function handleRequestSelection(pedido) {
    setSelectedPedido(pedido);
    clientDataRef.current.value = pedido.client;
    productDataRef.current.value = pedido.formatted_products;
  }

  function getStatusColor(status) {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-200";
      case "En proceso":
        return "bg-blue-200";
      case "Completado":
        return "bg-green-200";
      case "Cancelado":
        return "bg-red-200";
      default:
        return "bg-gray-100";
    }
  }

  return (
    <div className="bg-gray-100 py-8">
      {/* Encabezado */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-5 py-2 rounded-md text-white font-semibold text-xl transition-colors ${
            isEditing ? "bg-orange-500" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <FontAwesomeIcon
            icon={isEditing ? faTimes : faEdit}
            className="mr-2"
          />
          {isEditing ? "Cancelar edición" : "Editar"}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 px-24">
        {/* Sección izquierda */}
        <section className="col-span-1" id="left">
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
          <div className="space-y-4">
            {filteredPedidos.map((pedido) => (
              <div
                key={pedido.request_id}
                onClick={() => handleRequestSelection(pedido)}
                className={`border rounded-md cursor-pointer transition-colors flex items-center justify-around py-3  ${
                  selectedPedido?.request_id === pedido.request_id
                    ? "border-orange-400"
                    : "border-gray-300"
                } ${getStatusColor(pedido.status)}`}
              >
                <div className="flex flex-col p-0 ">
                  <p>
                    <strong>#{pedido.request_id}</strong>
                  </p>
                  <div>
                    <img src="" alt="" />
                    {/* TODO agregar un ícono de tiemppo */}
                    <p>
                      <strong>Hora:</strong> {pedido.time.split(".")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex align-top text-xl">
                  <p>
                    <strong>{pedido.status.toUpperCase()}</strong>
                  </p>
                </div>
                <div>
                  <button>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="absolute left-3 top-2.5 text-gray-400"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección derecha */}
        <section className="col-span-3 flex flex-col items-center gap-10">
          <div className="flex space-x-2">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => setSelectedBtn(button.id)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedBtn === button.id
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="flex gap-10">
            <div className="border-2 border-orange-400 rounded-lg p-4 shadow-lg h-80 w-80">
              <h3 className="text-lg font-medium mb-2">Datos del cliente</h3>
              <textarea
                readOnly={!isEditing}
                ref={clientDataRef}
                className={`w-full h-60 p-2 border rounded ${
                  isEditing ? "" : "bg-gray-100 cursor-not-allowed"
                }`}
              ></textarea>
            </div>

            <div className="border-2 border-orange-400 rounded-lg p-4 shadow-lg h-80 w-80">
              <h3 className="text-lg font-medium mb-2">Datos del Producto</h3>
              <textarea
                readOnly={!isEditing}
                ref={productDataRef}
                className={`w-full h-64 p-2 border rounded ${
                  isEditing ? "" : "bg-gray-100 cursor-not-allowed"
                }`}
              ></textarea>
            </div>
          </div>

          {isEditing ? (
            <button
              className="bg-orange-400 text-white px-6 py-2 rounded-md hover:bg-orange-300"
              disabled={!isEditing}
              onClick={() => {
                alert("Guardar en la base de datos!");
              }}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Guardar cambios
            </button>
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminRequest;
