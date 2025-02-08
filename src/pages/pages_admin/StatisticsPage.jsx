import React, { useState, useEffect } from "react";
import {
  getNetSalesByDate,
  getMostActiveHour,
  getProductsSold,
} from "../../supabase/nativeQuerys";
import { DoughnutChart } from "../../components/admin/StatisticsComponents/DoughnutChart";
import { People, AttachMoney, AccessTime, Star } from "@mui/icons-material";

const StatisticsPage = () => {
  //Obtener la fecha actual formateada y se define como valor inicial de las estadisticas
  const fechaActual = new Date().toISOString().split("T")[0];
  const [inputFecha, setDateInput] = useState(fechaActual);

  //Configuracion incial del diagrama de dona
  const dataIncialChart = {
    labels: ["sin datos"],
    datasets: [
      {
        data: [1],
      },
    ],
  };
  const [dataChart, setDataChart] = useState(dataIncialChart);

  //Estados de las estadisticas (Cards)
  const [ventasNetas, setVentasNetas] = useState(0);
  const [cantClientes, setCantClientes] = useState(0);
  const [mejorProducto, setMejorProducto] = useState("");

  const [horaPico, setHoraPico] = useState(0);
  const [cantVentasHoraPico, setCantVentasHoraPico] = useState(0);

  useEffect(() => {
    console.log(`\n\n\n---Estadisticas para la fecha: ${inputFecha}---`);

    //Obtenemos numero de filas y total de ventas
    getNetSalesByDate(inputFecha).then(({ ventas_netas, cant_clientes }) => {
      //Formateado el total de ventas a COP sin decimales
      ventas_netas = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(ventas_netas);
      setVentasNetas(ventas_netas);
      setCantClientes(cant_clientes);
    });

    //Obtenemos la hora pico
    getMostActiveHour(inputFecha).then(({ hour, insertions }) => {
      if (hour) {
        setHoraPico(`${hour}:00 - ${hour}:59`);
        setCantVentasHoraPico(insertions);
      } else {
        setHoraPico("00:00 - 00:00");
        setCantVentasHoraPico(0);
      }
    });

    //Obtenemos el producto mas vendido
    getProductsSold(inputFecha).then((products) => {
      /// Formatear los datos para el chart
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
    <div className="flex flex-col    items-center bg-white text-black p-6 m-0 rounded-lg shadow-lg transition-transform hover:scale-105">
      <div className="flex gap-2">
        <div className="text-indigo-400 mb-4">{icon}</div>
        <h3 className="text-lg font-sans  mb-2">{title}</h3>
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div id="modal" className="bg-gray-100 flex flex-col h-full p-10 pt-2">
      <div
        className="flex flex-col bg-gray-100 gap-3"
        about="contenedor de (graficos, card) y (calendario)"
      >
        <div
          className="flex bg-gray-100 flex-row p-2 justify-center mb-3"
          about="Calendario"
        >
          <input
            type="date"
            className="p-2 rounded-lg shadow-md"
            onChange={handleDateChange}
            value={inputFecha}
          />
        </div>
        <div className=" flex flex-row justify-evenly gap-4">
          <div
            className="bg-gray-100 grid grid-cols-2  w-full gap-4"
            about="Cards"
          >
            {cardsData.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
              />
            ))}
          </div>
          <div
            className="bg-yellow-50 w-full h-full flex justify-center"
            about="Line Chart"
          >
            <div className="flex flex-col justify-center h-fit w-full bg-white px-36 rounded shadow">
              <h2 className="text-center text-2xl font-bold p-4">
                Ventas por producto
              </h2>
              <DoughnutChart data={dataChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
