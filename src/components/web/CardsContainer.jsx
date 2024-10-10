import React, { useState, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import Card from "./Card";
import CompleteCard from "./CompleteCard";

const CardsContainer = () => {
  const { products } = useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      {selectedProduct && (
        <CompleteCard product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default CardsContainer;
