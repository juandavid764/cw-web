import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import Select from 'react-select';

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

  const options = sauces.map((sauce) => {
    return { value: `${sauce}`, label: `${sauce}`}
  });

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
          <ChevronDownIcon className="h-6 w-6 text-gray-600 animate-bounce" />
        )}
      </div>
      {isOpen && (
        <div className="mt-2 space-y-2 ">
          {sauces.map((sauce) => (
            <div key={sauce} className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 size-5"
                  checked={selectedSauces.includes(sauce)}
                  onChange={() => handleSauceSelection(sauce)}
                  id={sauce}
                />
                <label className="text-sm" htmlFor={sauce}>{sauce}</label>
              </div>
            </div>
          ))}
          {/* <Select
            defaultValue={selectedSauces}
            placeholder="Selecciona tus salsas..."
            isMulti
            options={options}
            onChange={(sauce) => {setSelectedSauces((prev) => (sauce.map((x)=>{return x.value})).length === 0 ? [...prev] : sauce.map((x)=>{return x.value}))}}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Sauces;
