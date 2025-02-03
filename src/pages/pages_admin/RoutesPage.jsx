import React, { useState, useEffect, useCallback } from "react";
import ButtonGroup from "../../components/admin/editComponents/ButtonGroup";
import Portal from "../../components/admin/routesComponents/ventana_modal/Portal";
import CardRoute from "../../components/admin/routesComponents/CardRoute";
import {
  getDomiciliaries,
  getRoutes,
  getRequestsInProcess,
  getRequestsWithRouteId,
} from "../../supabase/crudFunctions";

const RoutesPage = () => {
  const [domiciliaries, setDomiciliaries] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestWithRoute, setRequestWithRoute] = useState([]);
  const [selectedDomiciliary, setSelectedDomiciliary] = useState("");

  // Crear función reusable para recargar datos
  const reloadData = useCallback(async () => {
    try {
      const [routesData, domiciliaryData, requestsData, requestWithRouteData] =
        await Promise.all([
          getRoutes(),
          getDomiciliaries(),
          getRequestsInProcess(),
          getRequestsWithRouteId(),
        ]);

      setRoutes(routesData);
      setDomiciliaries(domiciliaryData);
      setRequests(requestsData);
      setRequestWithRoute(requestWithRouteData);
    } catch (error) {
      console.error("Error al recargar datos:", error);
    }
  }, []); // No dependencias porque no utiliza estados externos

  useEffect(() => {
    reloadData(); // Cargar datos al inicio
    if (domiciliaries.length > 0) {
      setSelectedDomiciliary(domiciliaries[0].domiciliary_id);
    }
  }, [reloadData]);

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
        <Portal
          domiciliarios={domiciliaryOptions}
          requests={requests}
          reloadRoutes={reloadData} // Usar reloadData directamente
        />
      </div>
      <div className=" flex justify-center flex-row bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-1">
          {filteredRoutes.map((route) => (
            <div key={route.route_id} className="flex-grow">
              <CardRoute
                route={route}
                domiciliaryOptions={domiciliaryOptions}
                requestWithRoute={requestWithRoute}
                reloadData={reloadData} // Pasar reloadData para acciones en CardRoute
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
