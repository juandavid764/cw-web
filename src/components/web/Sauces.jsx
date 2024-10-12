import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const Sauces = ({ updateSauces }) => {
  const { sauces } = useContext(ProductsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSauces, setSelectedSauces] = useState([]);

  const handleSauceSelection = (sauce) => {
    setSelectedSauces((prev) =>
      prev.includes(sauce) ? prev.filter((s) => s !== sauce) : [...prev, sauce]
    );
  };

  useEffect(() => {
    updateSauces(selectedSauces);
  }, [selectedSauces, updateSauces]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold">Salsas</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-gray-600" />
        )}
      </div>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {sauces.map((sauce) => (
            <div key={sauce} className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedSauces.includes(sauce)}
                  onChange={() => handleSauceSelection(sauce)}
                />
                <label className="text-sm">{sauce}</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sauces;
