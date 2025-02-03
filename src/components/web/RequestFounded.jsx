import React from "react";
import { addThousandSeparators } from "../../utils/addThousandSeparators.js";

const RequestFounded = ({ orderDetails }) => {
  const { request_id, client, date, time, status, total, formatted_products } =
    orderDetails;

  const realDate = new Date(date);

  // Definir colores según el estado de la fucking bolita
  const statusColors = {
    pendiente: "bg-yellow-500",
    "en proceso": "bg-blue-500",
    completado: "bg-green-500",
    cancelado: "bg-red-500",
  };

  const statusTextColors = {
    pendiente: "text-yellow-500",
    "en proceso": "text-blue-500",
    completado: "text-green-500",
    cancelado: "text-red-500",
  };

  const statusDotColor = statusColors[status.toLowerCase()] || "bg-gray-500";
  const statusTextColor =
    statusTextColors[status.toLowerCase()] || "text-gray-500";

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-w-lg w-full p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Pedido #{request_id}
        </h2>
        <div className="flex items-center space-x-2">
          <span
            className={`w-4 h-4 rounded-full ${statusDotColor}`}
            aria-label={`Estado: ${status}`}
          ></span>
          <h2 className={`text-xl font-bold ${statusTextColor}`}>{status}</h2>
        </div>
      </div>
      <p className="pb-3">
        Realizado el{" "}
        <span className="font-normal">
          {realDate.toLocaleDateString("es-ES")}
        </span>{" "}
        a las{" "}
        <span className="font-normal">{time.split(".")[0].slice(0, 5)}</span>
      </p>
      <div className="bg-neutral-50 border border-gray-200 p-4 rounded-lg  text-base h-80 overflow-y-scroll scrollbaroverflow-hidden text-gray-700 whitespace-pre-wrap">
        {formatted_products
          .replace(/\\nAdics:\\n/g, " ")
          .replace(/- Adics/g, " \n \n Adics ")
          .replace(/- /g, " \n ")
          .replace(/\[\[/g, "[")
          .replace(/\]\]/g, "]")
          .replace(/\\n/g, " \n ")}
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-600 font-medium">
          Total:{" "}
          <span className="text-xl font-bold text-orange-500">
            ${addThousandSeparators(total)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RequestFounded;
