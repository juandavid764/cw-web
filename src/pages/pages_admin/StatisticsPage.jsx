import React from "react";
import { LineChart } from "../../components/admin/StatisticsComponents/LineChart";
import { DoughnutChart } from "../../components/admin/StatisticsComponents/DoughnutChart";
import { People, AttachMoney, BarChart, TaskAlt } from "@mui/icons-material";



const StatisticsPage = () => {

    const cardsData = [
        { icon: <People fontSize="large" color="warning" />, title: "Usuarios", value: "1,245" },
        { icon: <AttachMoney fontSize="large" color="warning" />, title: "Ingresos", value: "$50,000" },
        { icon: <BarChart fontSize="large" color="warning" />, title: "Ventas", value: "12,340" },
        { icon: <TaskAlt fontSize="large" color="warning" sx />, title: "Tareas", value: "48 completadas" },
    ];

    const Card = ({ icon, title, value }) => (
        <div className="flex flex-col items-center bg-white text-black p-6 rounded-lg shadow-lg transition-transform hover:scale-105 m-3">
            <div className="text-indigo-400 mb-4">{icon}</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    );

    return (
        <div id="modal" className="bg-yellow-50 flex flex-col h-full">
            <div className="flex flex-col bg-yellow-50" about="contenedor de (graficos, card) y (calendario)">
                <div className="flex bg-yellow-50 flex-row p-8 justify-center" about="Calendario">
                    <input type="date" className="p-2 rounded-lg shadow-md" />
                </div>
                <div className=" flex flex-row justify-evenly">
                    <div className="bg-yellow-50 grid grid-cols-2 gap-4 w-full" about="Cards">
                        {cardsData.map((card, index) => (
                            <Card key={index} icon={card.icon} title={card.title} value={card.value} />
                        ))}
                    </div>
                    <div className="bg-yellow-50 w-full h-full flex justify-center" about="Line Chart">
                        <div className="flex flex-col justify-center h-fit bg-white w-fit px-36 rounded shadow">
                            <h2 className="text-center text-2xl font-bold p-4">% de ventas por producto</h2>
                            <DoughnutChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};



export default StatisticsPage;
