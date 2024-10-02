import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Additions from "./Additions";

const CompleteCard = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <span className="block text-lg font-semibold mt-4">
            ${product.price.toLocaleString()}
          </span>

          {/* Componente Additions */}
          <Additions />

          <button className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteCard;
