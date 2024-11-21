import React from "react";

const DetailsData = ({ order }) => {
  return (
    <div className="mb-4 border-t border-gray-300 pt-4">
      <div className="flex justify-between">
        <p>1 {order.product.name}</p>
        <p className="font-bold">${order.product.price.toLocaleString()}</p>
      </div>
      <div className="ml-4">
        <p className="font-semibold">Adiciones:</p>
        {order.additions.length > 0 ? (
          order.additions.map((addition, index) => (
            <div className="flex justify-between w-full" key={index}>
              <div className="flex items-center">
                <span>
                  {addition.quantity} {addition.name}
                </span>
              </div>
              <span>
                ${addition.price * addition.quantity.toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p>No hay adiciones.</p>
        )}
        <p className="font-semibold mt-2">Salsas:</p>
        {order.sauces.length > 0 ? (
          <p>{order.sauces.join(", ")}</p>
        ) : (
          <p>Sin salsas</p>
        )}
      </div>
    </div>
  );
};

export default DetailsData;
