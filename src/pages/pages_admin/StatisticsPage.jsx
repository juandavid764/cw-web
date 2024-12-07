import React from "react";

import { People, AttachMoney, BarChart, TaskAlt } from "@mui/icons-material";



const StatisticsPage = () => {

    const cardsData = [
        { icon: <People fontSize="large" />, title: "Usuarios", value: "1,245" },
        { icon: <AttachMoney fontSize="large" />, title: "Ingresos", value: "$50,000" },
        { icon: <BarChart fontSize="large" />, title: "Ventas", value: "12,340" },
        { icon: <TaskAlt fontSize="large" />, title: "Tareas", value: "48 completadas" },
    ];

    const Card = ({ icon, title, value }) => (
        <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 m-3">
            <div className="text-indigo-400 mb-4">{icon}</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    );

    return (
        <div id="modal" className="bg-gray-100 flex flex-col h-1.5">
            <div className="bg-orange-300 flex flex-col" about="contenedor de (graficos, card) y (calendario)">
                <div className="flex flex-row bg-lime-500" about="Calendario">

                </div>
                <div className="bg-red-400 flex flex-row">
                
                    <div className="bg-yellow-50 max-h-96 grid grid-cols-2 gap-4" about="Cards">
                        {cardsData.map((card, index) => (
                            <Card key={index} icon={card.icon} title={card.title} value={card.value} />
                        ))}
                    </div>
                    <div className="bg-yellow-800" about="Line Chart"></div>

                </div>


            </div>
            <div className="bg-blue-300" about="Grafico de dona">

            </div>



        </div>

    );
};



export default StatisticsPage;
