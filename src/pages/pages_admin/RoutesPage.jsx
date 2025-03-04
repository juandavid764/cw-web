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
import { useSubscribeToRouteChanges } from "../../supabase/Subscriptions.jsx";
import { getRouteModels } from "../../supabase/nativeQuerys.js";

const RoutesPage = () => {
  const buttons = [
    { id: 0, label: "Todos" },
  ];

  // indicadores (guarda del boton pulsado e indican la recarga de datos)
  const [reload, setReload] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);

  // Info de la base de datos
  const [domiciliaries, setDomiciliaries] = useState([]);
  const [routeModels, setRouteModels] = useState([]);
  const [reqsWithoutRoute, setReqsWithoutRoute] = useState([]); //! Requests a asignar ruta (en progreso sin ruta) 

  // Estados auxiliares
  const [filteredRouteModels, setFilteredRouteModels] = useState(routeModels);

  // Cambia el estado para indicar que hubo un cambio
  const reloadData = useCallback(async () => {
    setReload((prev) => !prev);
  }, []);

  // Suscripción a cambios en tiempo real
  useSubscribeToRouteChanges(reloadData);

  // Vuelva a cargar los datos cuando se cambie el estado de reload
  useEffect(() => {
    console.log("Recargando datos");

    getRouteModels().then((routeModelsData) => {
      setRouteModels(routeModelsData);
    });

    getRequestsInProcess().then((requestsData) => {
      setReqsWithoutRoute(requestsData);
    });

  }, [reload]);

  // carga los domiciliarios solo una vez
  useEffect(() => {
    getDomiciliaries().then((domiciliariesData) => {
      setDomiciliaries(domiciliariesData);
    });
  }, []);

  // Filtra las RoutesModels por el botón seleccionado
  const handleSelectButton = (id) => {
    setSelectedBtn(id);

    if (id === 0) { // 0 es el id de el boton "Todos"
      setFilteredRouteModels(routeModels);
    }else{
      setFilteredRouteModels(routeModels.filter((route) => route.domiciliary_id === id));
    }
  }

  return (
    <div
      id="modal"
      className="min-h-screen flex flex-col justify-start p-10 bg-gray-100"
    >
      <div className="flex flex-row justify-between px-11 py-3">
        {/* Botones para seleccionar domiciliarios */}
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleSelectButton(button.id)}
            className={`shadow px-4 py-2 rounded-md font-medium transition-colors ${
              selectedBtn === button.id
                ? "shadow-2xl bg-orange-400 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {button.label}
          </button>
        ))}
        {/* Botón para crear rutas */}
        {/* { <Portal
          domiciliarios={domiciliaries}
          requests={reqsWithoutRoute}
        /> } */}
      </div>
      <div className=" flex justify-center flex-row bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-1">
          {filteredRouteModels.map((route) => (
            <div key={route.route_id} className="flex-grow">
              {/* {<CardRoute routeModel={route} />} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
