import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Card = ({ product, onClick }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Obtener la imagen forzando una nueva solicitud al servidor
        const response = await fetch(product.imgUrl, { cache: "reload" });
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        setImageUrl(product.imgUrl); // Fallback a la URL original si falla
      }
    };

    fetchImage();
  }, [product.imgUrl]);

  return (
    <div
      className="max-w-xs h-[400px] bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out p-4"
      onClick={() => onClick(product)}
    >
      <img
        className="w-full h-48 object-cover rounded-md"
        src={imageUrl || product.imgUrl}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          <button className="bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-3 rounded-full flex items-center">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
