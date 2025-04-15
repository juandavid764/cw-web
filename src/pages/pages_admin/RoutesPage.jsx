import React, { useState, useEffect } from "react";
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
  const defaultButtons = [{ id: 0, label: "Todos" }];
  const [buttons, setButtons] = useState(defaultButtons);
  const [reload, setReload] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [domiciliaries, setDomiciliaries] = useState([]);
  const [routeModels, setRouteModels] = useState([]);
  const [reqsWithoutRoute, setReqsWithoutRoute] = useState([]);
  const [filteredRouteModels, setFilteredRouteModels] = useState([]);

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  useSubscribeToRouteChanges(reloadData);

  useEffect(() => {
    if (selectedBtn === 0) {
      setFilteredRouteModels(routeModels);
    } else {
      setFilteredRouteModels(
        routeModels.filter((route) => route.domiciliary == selectedBtn)
      );
    }
  }, [selectedBtn, routeModels]);

  useEffect(() => {
    getRouteModels().then((routeModelsData) => {
      if (!routeModelsData) {
        setFilteredRouteModels([]);
        return;
      }

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

    getRequestsInProcess().then((requestsData) => {
      setReqsWithoutRoute(requestsData);
    });
  }, [reload]);

  useEffect(() => {
    getDomiciliaries().then((domiciliariesData) => {
      setDomiciliaries(domiciliariesData);
      setButtons(
        defaultButtons.concat(
          domiciliariesData.map((domiciliary) => ({
            id: domiciliary.domiciliary_id,
            label: domiciliary.name,
          }))
        )
      );
    });
  }, []);

  const handleSelectButton = (idButton) => {
    setSelectedBtn(idButton);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header con filtros - Versión mejorada para móviles */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex flex-col gap-3">
          {/* Primera fila: Portal (creat Ruta) */}

          <div className="flex justify-center  w-full  sm:max-w-none">
            <Portal
              domiciliarios={domiciliaries}
              requests={reqsWithoutRoute}
              className="w-full"
            />
          </div>

          {/* Segunda fila: Botones de filtro con scroll horizontal */}
          <div className="relative w-full">
            <div className="overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex flex-nowrap gap-2 w-max">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => handleSelectButton(button.id)}
                    className={`flex-shrink-0 px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full font-medium transition-all whitespace-nowrap ${
                      selectedBtn === button.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Sombra para indicar scroll disponible */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 p-4">
        <button
          onClick={reloadData}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Recargar datos"
        >
          <FontAwesomeIcon
            icon={faRefresh}
            className="text-gray-600 hover:text-orange-500 transition-colors text-lg"
          />
        </button>

        {filteredRouteModels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRouteModels.map((route) => (
              <CardRoute
                key={route.route_id}
                routeModel={route}
                domiciliaries={domiciliaries}
                requests={reqsWithoutRoute}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-gray-500 text-lg">No hay rutas disponibles</h3>
            <p className="text-gray-400 mt-2 text-center">
              {selectedBtn === 0
                ? "No se encontraron rutas creadas"
                : "Este domiciliario no tiene rutas asignadas"}
            </p>
          </div>
        )}
      </main>

      {/* Estilos para ocultar scrollbar pero mantener funcionalidad */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RoutesPage;
