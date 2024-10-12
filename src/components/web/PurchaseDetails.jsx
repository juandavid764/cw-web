import React, { useContext } from "react";
import DetailsData from "./DetailsData";
import { ProductsContext } from "../../context/ProductsContext";

const PurchaseDetails = () => {
  const { cart } = useContext(ProductsContext);

  const calculateSubtotal = () => {
    return cart.reduce((total, order) => {
      const productPrice = order.product.price * order.quantity; // Precio del producto
      const additionsTotal = order.additions.reduce(
        (sum, addition) =>
          sum + addition.price * addition.quantity * order.quantity,
        0
      );

      return total + productPrice + additionsTotal; // Suma total
    }, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="mt-5 mb-5 w-[448px] h-max-[600px]  bg-white rounded-lg border border-gray-200 shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Detalles de compra</h2>
      <div className="max-h-[400px] overflow-y-scroll scrollbar">
        {" "}
        <div className="flex flex-col space-y-2">
          {" "}
          {cart.map((order, index) => (
            <DetailsData key={index} order={order} />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4 mb-4">
        <div className="flex justify-between">
          <p className="font-semibold">Subtotal:</p>
          <p className="font-bold">${subtotal.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex justify-around">
        <button className="bg-orange-400 text-white px-6 py-2 rounded-md hover:bg-orange-300">
          Domicilio
        </button>
        <button className="bg-orange-400 text-white px-6 py-2 rounded-md hover:bg-orange-300">
          Recoger
        </button>
      </div>
    </div>
  );
};

export default PurchaseDetails;
