import React, { useState, useEffect } from "react";
import ButtonGroup from "../../components/admin/editComponents/ButtonGroup";
import PortalRutas from "../../components/admin/routesComponents/ventana_modal/Portal";
import CardRoute from "../../components/admin/routesComponents/CardRoute";
import {
  getDomiciliaries,
  getRoutes,
  getRequestsInProcess,
} from "../../supabase/crudFunctions";

const RoutesPage = () => {
  const [domiciliaries, setDomiciliaries] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedDomiciliary, setSelectedDomiciliary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routesData, domiciliaryData, requestsData] = await Promise.all([
          getRoutes(),
          getDomiciliaries(),
          getRequestsInProcess(),
        ]);

        setRoutes(routesData);
        setDomiciliaries(domiciliaryData);
        setRequests(requestsData);

        // Set default selected domiciliary to the first one
        if (domiciliaryData.length > 0) {
          setSelectedDomiciliary(domiciliaryData[0].domiciliary_id); // Usar ID en lugar de nombre
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Función para recargar las rutas
  const reloadRoutes = async () => {
    try {
      const updatedRoutes = await getRoutes(); // Llamada a la función para obtener rutas
      const updatedPedidos = await getRequestsInProcess(); // Llamada a la función para obtener pedidos
      setRequests(updatedPedidos); // Actualizar el estado
      setRoutes(updatedRoutes); // Actualizar el estado de rutas
    } catch (error) {
      console.error("Error al recargar rutas:", error);
    }
  };

  const handleChangeDomiciliary = (domiciliaryId) => {
    setSelectedDomiciliary(domiciliaryId);
  };

  // Filtrar rutas basadas en el ID del domiciliario seleccionado
  const filteredRoutes = routes.filter(
    (route) => route.domiciliary === selectedDomiciliary
  );

  // Extraer nombres y IDs de domiciliarios
  const domiciliaryOptions = domiciliaries.map((d) => ({
    name: d.name,
    id: d.domiciliary_id,
  }));
  const requestIds = requests.map((request) => request.request_id);

  return (
    <div
      id="modal"
      className="min-h-screen flex flex-col justify-start p-10 bg-gray-100"
    >
      <div className="flex flex-row justify-between px-11 py-3">
        {/* Botones para seleccionar domiciliarios */}
        <ButtonGroup
          options={domiciliaryOptions.map((d) => d.name)} // Mostrar nombres en botones
          selected={
            domiciliaryOptions.find((d) => d.id === selectedDomiciliary)?.name
          } // Mostrar el nombre seleccionado
          onSelect={(name) => {
            const selected = domiciliaryOptions.find((d) => d.name === name);
            handleChangeDomiciliary(selected?.id || "");
          }}
        />
        {/* Botón para crear rutas */}
        <PortalRutas
          domiciliarios={domiciliaryOptions}
          idPedidos={requestIds}
          reloadRoutes={reloadRoutes}
        />
      </div>
      <div className="min-h-screen flex justify-center flex-row bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-1">
          {/* Mostrar las rutas filtradas */}
          {filteredRoutes.map((route) => (
            <div key={route.route_id} className="flex-grow">
              <CardRoute route={route} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
