// Card.jsx
import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

//No se aún en que momento usar la category

const Card = ({ image, name, description, price, category }) => {
  return (
    <div className="max-w-xs h-[400px] bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out p-4">
      <img
        className="w-full h-48 object-cover rounded-md"
        src={image}
        alt={name}
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-900">
            ${price.toLocaleString()}
          </span>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-3 rounded-full flex items-center">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
