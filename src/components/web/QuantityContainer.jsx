import React, { useContext } from "react";
import Quantity from "./Quantity";
import { ProductsContext } from "../../context/ProductsContext";

const QuantityContainer = () => {
  const { cart } = useContext(ProductsContext);
  return (
    <div className="lg:mt-5 lg:mb-5 lg:w-[448px] lg:h-[600px]">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items max-h-[600px] overflow-y-scroll scrollbar">
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
