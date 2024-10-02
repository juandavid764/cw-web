import React, { useState, useContext } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { ProductsContext } from "../../context/ProductsContext";

const Additions = () => {
  const { additions } = useContext(ProductsContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold">Adiciones</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-gray-600" />
        )}
      </div>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {additions.map((addition) => (
            <div
              key={addition.name}
              className="flex justify-between items-center"
            >
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm">{addition.name}</label>
              </div>
              <span className="text-sm font-medium">
                ${addition.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Additions;
