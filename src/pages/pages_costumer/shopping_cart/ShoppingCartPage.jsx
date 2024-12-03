import React, { useContext, useEffect } from "react";
import PurchaseDetails from "../../../components/web/PurchaseDetails";
import QuantityContainer from "../../../components/web/QuantityContainer";
import Footer from "../../../components/web/Footer";
import { ProductsContext } from "../../../context/ProductsContext";

const ShoppingCartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cart } = useContext(ProductsContext);
  return (
    <div className="bg-white w-full flex justify-center  ">
      <div className="w-full">
        {cart.length > 0 ? (
          <div className="flex w-full justify-center">
            <div className="flex flex-col lg:flex-row bg-white w-full lg:w-[75%] items-center lg:justify-between">
              <QuantityContainer />
              <div className="flex flex-col h-full space-y-2 w-full md:w-[70%] lg:w-[42%] ">
                <PurchaseDetails />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[500px] flex items-center justify-center w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center shadow-lg">
              No hay órdenes en el carrito.
            </h1>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
