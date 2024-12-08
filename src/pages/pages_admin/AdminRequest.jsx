import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@mui/material";
import { getFormatRequest } from "../../supabase/nativeQuerys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { RequestsList } from "../../components/admin/requestsComponents/RequestsList";
import { DropdownStates } from "../../components/admin/requestsComponents/DropdownStates";
import { updateRequest } from "../../supabase/crudFunctions";

const AdminRequest = () => {
  const buttons = [
    { id: 0, label: "Todos" },
    { id: 1, label: "Pendiente" },
    { id: 2, label: "En proceso" },
    { id: 3, label: "Completado" },
    { id: 4, label: "Cancelado" },
  ];

  const [isEditing, setIsEditing] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [formattedRequest, setFormattedRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el texto de búsqueda
  const [newState, setNewState] = useState("Pendiente");
  const [newTotal, setNewTotal] = useState(0);

  const [refreshData, setRefreshData] = useState(false);

  const clientDataRef = useRef();
  const productDataRef = useRef();
  const totalCostRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const data = await getFormatRequest();
      setFormattedRequest(data || []);
      console.log("Actualice la data");
    }
    fetchData();

    // const timer = setTimeout(() => {
    //   setRefreshData(!refreshData);
    // }, 3000);

    // return () => clearTimeout(timer);
  }, [refreshData]);

  const filteredPedidos = useMemo(() => {
    return formattedRequest.filter((pedido) => {
      const matchesStatus =
        selectedBtn === 0 || pedido.status === buttons[selectedBtn].label;
      const matchesSearch =
        pedido.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Number(pedido.request_id).toString().includes(searchTerm);
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
    clientDataRef.current.value = pedido.client.replace(/\\n/g, "\n");
    productDataRef.current.value = pedido.formatted_products
      .replace(/\\nAdics:\\n/g, " ")
      .replace(/- Adics/g, " \n \n Adics ")
      .replace(/- /g, " \n ")
      .replace(/\[\[/g, "[")
      .replace(/\]\]/g, "]")
      .replace(/\\n/g, " \n ");
  }

  function restartFields() {
    setRefreshData(!refreshData);
    clientDataRef.current.value = "";
    productDataRef.current.value = "";
    totalCostRef.current.value = "";
    setSelectedPedido(null);
  }

  // actualiza el estado del pedido apenas haya un pedido seleccionado
  useEffect(() => {
    if (selectedPedido) {
      setNewState(selectedPedido?.status);
      setNewTotal(selectedPedido?.total);
      totalCostRef.current.value = selectedPedido?.total;
    }
  }, [selectedPedido]);

  async function handleSave() {
    const pedidoUpdating = selectedPedido;

    // validación
    if (newTotal < 0 || !parseFloat(newTotal)) {
      alert("Hay un error con alguno de los campos");
      return;
    }

    // actualizamos los campos que supuestamente cambian
    pedidoUpdating.client = clientDataRef.current.value;
    pedidoUpdating.status = newState;
    pedidoUpdating.total = parseFloat(newTotal);

    // y AQUÍ se actualizaría el pedido:
    // updatePedido(pedidoUpdating)
    await updateRequest({
      request_id: pedidoUpdating.request_id,
      client: pedidoUpdating.client,
      status: pedidoUpdating.status,
      total: pedidoUpdating.total,
    });

    restartFields();
  }

  return (
    <div className="py-4">
      {/* Encabezado */}

      <div className="flex justify-around">
        <section
          className="col-span-1 overflow-y-scroll max-h-[650px] px-5"
          id="left"
        >
          <RequestsList
            filteredPedidos={filteredPedidos}
            handleRequestSelection={handleRequestSelection}
            selectedPedido={selectedPedido}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </section>

        <section className="col-span-5 flex flex-col items-center gap-10 ">
          <div className="flex space-x-2">
            <div>
              <button
                className="bg-gray-900 text-white px-3 rounded-md my-2"
                onClick={() => {
                  setRefreshData(!refreshData);
                  restartFields();
                }}
              >
                <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                Refrescar
              </button>
            </div>
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => setSelectedBtn(button.id)}
                className={`shadow px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedBtn === button.id
                    ? "shadow-2xl bg-orange-400 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="flex gap-10">
            <div className="  rounded-lg p-4 shadow-lg h-96 w-80">
              <h3 className="text-lg font-medium mb-2">Datos del cliente</h3>
              <textarea
                ref={clientDataRef}
                className={`border w-full h-56 p-2 rounded  resize-none ${
                  isEditing ? "" : "bg-gray-100"
                }`}
              ></textarea>
              <div className="flex flex-col items-center justify-center py-2 gap-0">
                <div className="flex items-center justify-center mb-5 gap-3">
                  {selectedPedido && (
                    <>
                      {" "}
                      <h1 className="p-0 m-0 ">Total:</h1>
                      <input
                        onChange={(e) => setNewTotal(e.target.value)}
                        type="text"
                        ref={totalCostRef}
                        className={
                          " w-36 pl-5 border" +
                          `${isEditing === false ? "" : ""}`
                        }
                      />
                    </>
                  )}
                </div>

                <DropdownStates estado={newState} setNewState={setNewState} />
              </div>
            </div>

            <div className=" rounded-lg p-4 shadow-lg h-96 w-80">
              <h3 className="text-lg font-medium mb-2">Datos del Producto</h3>
              <textarea
                readOnly
                ref={productDataRef}
                className={`w-full h-64 p-2 border rounded resize-none${
                  isEditing ? "bg-gray-400" : "bg-gray-200 cursor-not-allowed"
                }`}
              ></textarea>
            </div>
          </div>

          <button
            className="bg-orange-400 text-white px-6 rounded-md hover:bg-orange-300 py-4"
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default AdminRequest;
