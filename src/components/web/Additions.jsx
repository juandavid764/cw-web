import React, { useState, useEffect, useContext } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ProductsContext } from "../../context/ProductsContext";

const Additions = ({ updateTotal }) => {
  const { additions } = useContext(ProductsContext);
  const [selectedAdditions, setSelectedAdditions] = useState([]);
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false); //El estado isOpen se inicializa en false para no ver las adiciones al principio
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    updateTotal(selectedAdditions);
  }, [selectedAdditions, updateTotal]);

  const handleCheckbox = (addition) => {
    setSelected((prevSelected) => {
      const newSelected = !prevSelected[addition.id];
      if (newSelected) {
        addAddition(addition);
      } else {
        setSelectedAdditions((prevAdditions) =>
          prevAdditions.filter((item) => item.id !== addition.id)
        );
      }
      return { ...prevSelected, [addition.id]: newSelected };
    });
  };

  const addAddition = (addition) => {
    setSelectedAdditions((prevAdditions) => {
      const existingAddition = prevAdditions.find(
        (item) => item.id === addition.id
      );
      if (existingAddition) {
        return prevAdditions.map((item) =>
          item.id === addition.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevAdditions, { ...addition, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setSelectedAdditions((prevAdditions) =>
      prevAdditions.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setSelectedAdditions((prevAdditions) => {
      const newAdditions = prevAdditions
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      if (newAdditions.length < prevAdditions.length) {
        setSelected((prevSelected) => {
          const { [id]: _, ...rest } = prevSelected;
          return rest;
        });
      }
      return newAdditions;
    });
  };

  const total = selectedAdditions.reduce(
    (acc, addition) => acc + addition.price * addition.quantity,
    0
  );

  return (
    <div className="mt-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold mb-2">Adiciones</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-gray-600" />
        )}
      </div>
      {isOpen && (
        <ul>
          {additions.map((addition) => (
            <li
              key={addition.id}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={!!selected[addition.id]}
                    onChange={() => handleCheckbox(addition)}
                  />
                  <span>{addition.name}</span>
                </div>
                <span>${addition.price.toLocaleString()}</span>
              </div>
              {selected[addition.id] && (
                <div className="flex flex-row justify-center">
                  <button
                    className="bg-orange-300"
                    onClick={() => decreaseQuantity(addition.id)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="mx-2">
                    {selectedAdditions.find((item) => item.id === addition.id)
                      ?.quantity || 0}
                  </span>
                  <button
                    className="bg-orange-300"
                    onClick={() => increaseQuantity(addition.id)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Additions;
