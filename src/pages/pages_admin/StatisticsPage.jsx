import React, { useState, useEffect } from "react";
import {
  getNetSalesByDate,
  getMostActiveHour,
  getProductsSold,
} from "../../supabase/nativeQuerys";
import { DoughnutChart } from "../../components/admin/StatisticsComponents/DoughnutChart";
import { People, AttachMoney, AccessTime, Star } from "@mui/icons-material";

const StatisticsPage = () => {
  const fechaActual = new Date().toISOString().split("T")[0];
  const [inputFecha, setDateInput] = useState(fechaActual);

  const dataIncialChart = {
    labels: ["sin datos"],
    datasets: [
      {
        data: [1],
      },
    ],
  };
  const [dataChart, setDataChart] = useState(dataIncialChart);

  const [ventasNetas, setVentasNetas] = useState(0);
  const [cantClientes, setCantClientes] = useState(0);
  const [mejorProducto, setMejorProducto] = useState("");
  const [horaPico, setHoraPico] = useState(0);
  const [cantVentasHoraPico, setCantVentasHoraPico] = useState(0);

  useEffect(() => {
    console.log(`\n\n\n---Estadisticas para la fecha: ${inputFecha}---`);

    getNetSalesByDate(inputFecha).then(({ ventas_netas, cant_clientes }) => {
      ventas_netas = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(ventas_netas);
      setVentasNetas(ventas_netas);
      setCantClientes(cant_clientes);
    });

    getMostActiveHour(inputFecha).then(({ hour, insertions }) => {
      if (hour) {
        setHoraPico(`${hour}:00 - ${hour}:59`);
        setCantVentasHoraPico(insertions);
      } else {
        setHoraPico("00:00 - 00:00");
        setCantVentasHoraPico(0);
      }
    });

    getProductsSold(inputFecha).then((products) => {
      const labels = products
        ? products.map((product) => product.product_name)
        : [];
      const dataValues = products
        ? products.map((product) => product.total_quantity)
        : [];

      const data = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
          },
        ],
      };

      setDataChart(data);
      setMejorProducto(products[0]?.product_name || "N/A");
    });
  }, [inputFecha]);

  const handleDateChange = (event) => {
    setDateInput(event.target.value);
  };

  const cardsData = [
    {
      icon: <People fontSize="large" color="warning" />,
      title: "Clientes",
      value: cantClientes,
    },
    {
      icon: <AttachMoney fontSize="large" color="warning" />,
      title: "Ventas netas",
      value: ventasNetas,
    },
    {
      icon: <AccessTime fontSize="large" color="warning" />,
      title: "Hora pico",
      value: `${horaPico} [${cantVentasHoraPico}]`,
    },
    {
      icon: <Star fontSize="large" color="warning" />,
      title: "Mejor producto",
      value: mejorProducto,
    },
  ];

  const Card = ({ icon, title, value }) => (
    <div className="flex flex-col items-center bg-white text-black px-1 py-4 md:p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
      <div className="flex items-center gap-2">
        <div className="text-indigo-400">{icon}</div>
        <h3 className="md:text-lg font-sans">{title}</h3>
      </div>
      <p className="md:text-2xl font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <input
            type="date"
            className="p-2 rounded-lg shadow-md sm:w-auto"
            onChange={handleDateChange}
            value={inputFecha}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 md:max-h-screen flex justify-center">
            <div className="bg-white w-full p-4 md:p-6 rounded shadow">
              <h2 className="text-center text-xl md:text-2xl font-bold mb-4">
                Ventas por producto
              </h2>
              <div className="flex justify-center">
                <div className="w-full md:w-1/2">
                  <DoughnutChart data={dataChart} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;