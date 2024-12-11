import React, { useState, useContext, useEffect } from "react";
import Additions from "./Additions";
import Sauces from "./Sauces";
import CardHeader from "./CardHeader";
import { ProductsContext } from "../../context/ProductsContext";

const CompleteCard = ({ product, onClose }) => {
  const [total, setTotal] = useState(product.price);
  const [selectedAdditions, setSelectedAdditions] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const { addToCart } = useContext(ProductsContext); // Importo el contexto con la funcion addToCart

  // Bloquear el scroll en el fondo mientras el modal esté abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  //Funcion que me permite agregar el producto al carrito
  const handleAddToCart = () => {
    addToCart(product, selectedAdditions, selectedSauces); // Llamo la funcion addToCart del contexto
    onClose(); // Cierro el modal de este producto
  };

  //Funcion que me permite actualizar el total del producto en especifico
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
      <div className="bg-white h-screen max-w-lg w-full md:max-h-[600px] relative overflow rounded-lg mt-4">
        <div className="sticky top-0 bg-white z-10 px-3 pt-2">
          <CardHeader total={total} onClose={onClose} />
        </div>
        <div className="flex flex-col p-6 overflow-y-scroll max-h-[90%] h-[90%] md:h-[95%] md:max-h-[95%]">
          <div className="flex justify-center items-center pb-2 pt-2 md:pb-0 md:pt-0">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-96 h-96 md:w-60 md:h-60 object-cover rounded-md"
            />
          </div>
          <div className="mt-auto">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <span className="block text-lg font-semibold">
                ${product.price.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{product.description}</p>

            {product.withAddition && (
              <>
                <Sauces updateSauces={setSelectedSauces} />
                <Additions updateTotal={updateTotal} />
              </>
            )}
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteCard;
