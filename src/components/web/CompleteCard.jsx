import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Additions from "./Additions";
import Sauces from "./Sauces";
import CardHeader from "./CardHeader";

const CompleteCard = ({ product, onClose }) => {
  const [total, setTotal] = useState(product.price);
  const [selectedAdditions, setSelectedAdditions] = useState([]);

  const updateTotal = (additions) => {
    const additionsTotal = additions.reduce(
      (acc, addition) => acc + addition.price * addition.quantity,
      0
    );
    setTotal(product.price + additionsTotal);
    setSelectedAdditions(additions);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full max-h-[600px] relative overflow-hidden rounded-lg">
        <div className="sticky top-0 bg-white z-10 px-3 pt-2 ">
          <CardHeader total={total} onClose={onClose} />
        </div>
        <div className="p-6 overflow-y-scroll max-h-[500px]">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-md"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <span className="block text-lg font-semibold">
                ${product.price.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{product.description}</p>

            <Additions updateTotal={updateTotal} />
            <Sauces />

            <button className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteCard;
