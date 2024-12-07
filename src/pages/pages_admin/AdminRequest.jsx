import React, { useEffect, useMemo, useRef, useState } from "react";
import { getFormatRequest } from "../../supabase/nativeQuerys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { RequestsList } from "../../components/admin/requestsComponents/RequestsList";
import { DropdownStates } from "../../components/admin/requestsComponents/DropdownStates";

const AdminRequest = () => {
  const buttons = [
    { id: 0, label: "Todos" },
    { id: 1, label: "Pendiente" },
    { id: 2, label: "En proceso" },
    { id: 3, label: "Completado" },
    { id: 4, label: "Cancelado" },
  ];

  const [selectedBtn, setSelectedStateBtn] = useState(0);
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
    productDataRef.current.value = pedido.formatted_products.replace(
      /\\n/g,
      "\n"
    );
  }

  // actualiza el estado del pedido apenas haya un pedido seleccionado
  useEffect(() => {
    if (selectedPedido) {
      setNewState(selectedPedido?.status);
      setNewTotal(selectedPedido?.total);
      totalCostRef.current.value = selectedPedido?.total;
    }
  }, [selectedPedido]);

  function handleSave() {
    const pedidoUpdating = selectedPedido;

    // validación
    if (newTotal < 0 || !parseFloat(newTotal)) {
      alert("Hay un error con alguno de los campos");
      return;
    }

    // actualizamos los campos que supuestamente cambian
    pedidoUpdating.status = newState;
    pedidoUpdating.total = parseFloat(newTotal);

    // y AQUÍ se actualizaría el pedido:
    // updatePedido(pedidoUpdating)

    console.log(pedidoUpdating); // ELIMINAR ESTO!
  }

  return (
    <div className="bg-gray-100 py-4">

      <div className="flex items-center  justify-around  gap-0 px-52 md:px-5">
        <section className="col-span-2" id="left">
          <RequestsList
            filteredPedidos={filteredPedidos}
            handleRequestSelection={handleRequestSelection}
            selectedPedido={selectedPedido}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </section>

        <section className="col-span-5 flex flex-col items-center gap-10">
          
          <div className="flex space-x-2">
          <div>
            <button className="bg-gray-900 text-white px-6 rounded-md" onClick={() => { setRefreshData(!refreshData)}}>
              Refrescar
            </button>
          </div>
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => setSelectedStateBtn(button.id)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${selectedBtn === button.id
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="flex gap-10">
            <div className="border-2 border-orange-400 rounded-lg p-4 shadow-lg h-96 w-80">
              <h3 className="text-lg font-medium mb-2">Datos del cliente</h3>
              <textarea
                ref={clientDataRef}
                className={`w-full h-56 p-2 rounded  resize-none border-4 border-gray-400
                  
                `}
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
                          "border-2 border-black rounded-2xl w-36 pl-5 bg-white"

                        }
                      />
                    </>
                  )}
                </div>

                <DropdownStates
                  estado={newState}
                  setNewState={setNewState}

                />
              </div>
            </div>

            <div className="border-2 border-orange-400 rounded-lg p-4 shadow-lg h-96 w-80">
              <h3 className="text-lg font-medium mb-2">Datos del Producto</h3>
              <textarea
                readOnly
                ref={productDataRef}
                className={`w-full h-64 p-2 rounded resize-none border-4 border-gray-400`}
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
