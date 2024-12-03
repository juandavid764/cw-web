import React, { useState, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import Card from "./Card";
import CompleteCard from "./CompleteCard";
import CardSkeleton from "./CardSkeleton";

const CardsContainer = () => {
  const { loading, filteredProducts } = useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-orange-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {loading || !filteredProducts.length
            ? Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              )) // Renderiza 8 skeletons
            : filteredProducts.map((product) => (
                <Card
                  key={product.product_id}
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
