import React, { useState, useEffect, useCallback } from "react";
import { useSubscribeToRouteChanges } from "../../supabase/Subscriptions.jsx";

import Portal from "../../components/admin/routesComponents/ventana_modal/Portal";
import CardRoute from "../../components/admin/routesComponents/CardRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

import {
  getDomiciliaries,
  getRequestsInProcess,
} from "../../supabase/crudFunctions";
import { getRouteModels } from "../../supabase/nativeQuerys.js";

import RouteModel from "../../Models/RouteModel.js";

const RoutesPage = () => {
  const detaulButtons = [{ id: 0, label: "Todos" }];
  const [buttons, setButtons] = useState(detaulButtons);

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
      // Convierte los datos en objetos de la clase RouteModel
      const routeModelsMap = routeModelsData.map((route) => {
        return new RouteModel({
          date: route.date,
          time: route.time,
          total: route.total,
          status: route.status,
          requests: route.requests,
          route_id: route.route_id,
          domiciliary: route.domiciliary,
        });
      });

      setRouteModels(routeModelsMap);
    });

    // Obtiene las requests en proceso sin ruta asignada
    getRequestsInProcess().then((requestsData) => {
      setReqsWithoutRoute(requestsData);
    });
  }, [reload]);

  // carga los domiciliarios solo una vez
  useEffect(() => {
    getDomiciliaries().then((domiciliariesData) => {
      setDomiciliaries(domiciliariesData);

      // Crea los botones para seleccionar los domiciliarios
      setButtons(
        detaulButtons.concat(
          domiciliariesData.map((domiciliary) => ({
            id: domiciliary.domiciliary_id,
            label: domiciliary.name,
          }))
        )
      );
    });
  }, []);

  // Filtra las RoutesModels por el botón seleccionado
  const handleSelectButton = (idButton) => {
    console.log(routeModels);
    setSelectedBtn(idButton);

    if (idButton === 0) {
      // 0 es el id de el boton "Todos"
      setFilteredRouteModels(routeModels);
    } else {
      setFilteredRouteModels(
        routeModels.filter((route) => route.domicilary == idButton)
      );
    }
  };

  return (
    <div
      id="modal"
      className="min-h-screen flex flex-col justify-start p-10 bg-gray-100"
    >
      <div className="flex flex-row justify-between px-11 py-3">
        <div className="flex flex-row justify-center">
          {/* Botón para refrescar datos */}
          <button
            onClick={reloadData}
            className=" px-3 rounded-md my-2  active:transition-transform active:scale-90"
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
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
        </div>
        {/* Botón para crear rutas */}
        {<Portal domiciliarios={domiciliaries} requests={reqsWithoutRoute} />}
      </div>
      <div className=" flex justify-center flex-row bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-1">
          {filteredRouteModels.map((route) => (
            <div key={route.route_id} className="flex-grow">
              <h1>{route.date}</h1> //! Borrar cuando se implemente CaardRoute
              {/* {<CardRoute routeModel={route} />} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
