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
  const [reload, setReload] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [domiciliaries, setDomiciliaries] = useState([]);
  const [routeModels, setRouteModels] = useState([]);
  const [reqsWithoutRoute, setReqsWithoutRoute] = useState([]);

  const [filteredRouteModels, setFilteredRouteModels] = useState([]);

  const reloadData = useCallback(async () => {
    setReload((prev) => !prev);
  }, []);

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
        detaulButtons.concat(
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
    <div className="min-h-screen flex flex-col justify-start p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 md:px-8 lg:px-10 py-3 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={reloadData}
            className="p-2 rounded-md hover:bg-gray-200 transition-colors active:scale-90"
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className="text-lg sm:text-base text-gray-600"
            />
          </button>

          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleSelectButton(button.id)}
              className={`text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium transition-colors ${
                selectedBtn === button.id
                  ? "bg-orange-400 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Este es el portal, se puede adaptar para que simplemente abra el modal*/}
        <div className="self-center sm:self-auto w-full sm:w-auto">
          <Portal domiciliarios={domiciliaries} requests={reqsWithoutRoute} />
        </div>
      </div>

      {/* la grilla de las routeCards  */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 lg:px-10">
          {filteredRouteModels.map((route) => (
            <div key={route.route_id} className="w-full">
              <CardRoute
                routeModel={route}
                domiciliaries={domiciliaries}
                requests={reqsWithoutRoute}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
