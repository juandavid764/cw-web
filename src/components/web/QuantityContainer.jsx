import React, { useContext } from "react";
import Quantity from "./Quantity";
import { ProductsContext } from "../../context/ProductsContext";

const QuantityContainer = () => {
  const { cart } = useContext(ProductsContext);
  return (
    <div className="mt-5 mb-5 w-[448px] h-[600px]   p-6">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col  max-h-[550px] overflow-y-scroll scrollbar">
          {" "}
          {cart.map((order, index) => (
            <Quantity key={index} order={order} />
          ))}
        </div>
      </div>
      <Quantity />
    </div>
  );
};

export default QuantityContainer;
