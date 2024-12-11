import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, SpeedDial, SpeedDialAction } from "@mui/material";
import { getFormatRequest } from "../../supabase/nativeQuerys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faSearch,
  faRefresh,
  faCopy,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import { RequestsList } from "../../components/admin/requestsComponents/RequestsList";
import { DropdownStates } from "../../components/admin/requestsComponents/DropdownStates";
import { updateRequest } from "../../supabase/crudFunctions";
import { supabase } from "../../supabase/client";

const AdminRequest = () => {
  const buttons = [
    { id: 0, label: "Todos" },
    { id: 1, label: "Pendiente" },
    { id: 2, label: "En proceso" },
    { id: 3, label: "Completado" },
    { id: 4, label: "Cancelado" },
  ];

  const actions = [
    { icon: <FontAwesomeIcon icon={faCopy} />, name: "Copiar" },
    { icon: <FontAwesomeIcon icon={faSave} />, name: "Guardar" },
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

  // Suscripción a cambios en tiempo real
  useEffect(() => {
    const requestChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
        (payload) => {
          console.log("Cambio detectado en Request:", payload);
          setRefreshData((prev) => !prev); // Forzar recarga de datos
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(requestChannel); // Limpiar suscripción al desmontar
    };
  }, []);

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

  // Función para copiar al portapapeles
  function copyToClipboard() {
    const content =
      "#" +
      selectedPedido.request_id +
      "\n" +
      productDataRef.current.value +
      "\n" +
      clientDataRef.current.value;
    navigator.clipboard
      .writeText(content)
      .then(() => alert("¡Contenido actualizado y copiado al portapapeles!"))
      .catch((err) => alert("Hubo un error al copiar el contenido."));
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
    copyToClipboard();

    restartFields();
  }

  return (
    <div className="my-4 w-full grow flex flex-col justify-center bg-gray-100">
      <div className="mx-12 grid grid-cols-[360px_2fr] grid-rows-1 gap-2">
        {/* Campo de búsqueda */}
        <div className="relative grow gap-4">
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
        <div className="flex space-x-2 justify-center">
          <div>
            <button
              className=" px-3 rounded-md my-2"
              onClick={() => {
                setRefreshData(!refreshData);
                restartFields();
              }}
            >
              <FontAwesomeIcon icon={faRefresh} />
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
      </div>

      <div className="mx-12 my-2 grid grid-cols-[360px_2fr] grid-rows-[500px] gap-12">
        {/* Encabezado */}

        <section className="overflow-y-scroll h-[500px] px-5" id="left">
          <RequestsList
            filteredPedidos={filteredPedidos}
            handleRequestSelection={handleRequestSelection}
            selectedPedido={selectedPedido}
          />
        </section>
        <section className="flex flex-col items-center gap-8 pt-4">
          <div className="grid grid-cols-2 grid-rows-1 w-full h-full gap-12">
            <div className="bg-white  rounded p-4 shadow h-full w-full flex flex-col">
              <h3 className="text-xl mb-2 font-bold">Datos del cliente</h3>
              <textarea
                ref={clientDataRef}
                className={`border w-full h-56 p-2 rounded  resize-none ${
                  isEditing ? "" : "bg-gray-100"
                }`}
              ></textarea>
              <div className="flex flex-col items-center justify-center py-2 gap-4 mt-auto">
                <div className="flex items-center justify-center mb-5 gap-3 w-full">
                  {selectedPedido && (
                    <>
                      <p>Total:</p>
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

                <div className="w-full flex justify-center">
                  <DropdownStates estado={newState} setNewState={setNewState} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-lg h-full w-full">
              <h3 className="text-xl mb-2 font-bold">Datos del producto</h3>
              <textarea
                readOnly
                ref={productDataRef}
                className={`w-full h-[90%] p-2 border rounded resize-none${
                  isEditing ? "bg-gray-400" : "bg-gray-200 cursor-not-allowed"
                }`}
              ></textarea>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="bg-orange-400 text-white px-8 rounded-lg hover:bg-orange-300 py-2"
              onClick={() => {
                handleSave();
              }}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {/* {Botón de solo guardar} */}

            {/* {Guardar y copiar} */}
            {/* <SpeedDial
            color="orange"
            ariaLabel="SpeedDial basic example"
            
            icon={<FontAwesomeIcon icon={faPlus}/>}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminRequest;
