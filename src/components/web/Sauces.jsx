import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const Sauces = ({ updateSauces }) => {
  const { sauces } = useContext(ProductsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [saucesOptions, setSelectedSauces] = useState([{ "sin roja": false, "sin piña": false, "sin verde": false }]);
  const [fastSaucesOptions, setFastSelection] = useState(false);

  const handleSauceSelection = (sauce) => {
    if (sauce === "Sin roja" || sauce === "Sin piña" || sauce === "Sin verde") {
      setSelectedSauces([sauce])
      setFastSelection(true)

    } else {
      if (fastSaucesOptions) {
        setSelectedSauces([])
      }
      setSelectedSauces((prev) =>
        prev.includes(sauce) ? prev.filter((s) => s !== sauce) : [...prev, sauce]
      );
      setFastSelection(false)

    }
  };

  useEffect(() => {
    updateSauces(saucesOptions);
  }, [saucesOptions, updateSauces]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const options = sauces.map((sauce) => {
    return { value: `${sauce}`, label: `${sauce}` }
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
        <div className="mt-2 flex flex-wrap gap-3">
          {sauces.slice(0, -3).map((sauce) => (
            <div className="flex items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <input
                type="checkbox"
                className="mr-2 size-5"
                checked={fastSaucesOptions?false:saucesOptions.includes(sauce)}
                onChange={() => handleSauceSelection(sauce)}
                id={sauce}
              />
              <label className="text-sm" htmlFor={sauce}>{sauce}</label>
            </div>
          ))}
          <div className="w-full border-t border-gray-300 my-2"></div>
          {sauces.slice(-3).map((sauce) => (
            <div className="flex items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <input
                checked={saucesOptions.includes(sauce)}
                type="checkbox"
                className="mr-2 size-5"
                onChange={() => handleSauceSelection(sauce)}
                id={sauce}
              />
              <label className="text-sm" htmlFor={sauce}>{sauce}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sauces;
