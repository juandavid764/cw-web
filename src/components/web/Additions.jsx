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
      const newSelected = !prevSelected[addition.addition_id];
      if (newSelected) {
        addAddition(addition);
      } else {
        setSelectedAdditions((prevAdditions) =>
          prevAdditions.filter(
            (item) => item.addition_id !== addition.addition_id
          )
        );
      }
      return { ...prevSelected, [addition.addition_id]: newSelected };
    });
  };

  const addAddition = (addition) => {
    setSelectedAdditions((prevAdditions) => {
      const existingAddition = prevAdditions.find(
        (item) => item.addition_id === addition.addition_id
      );
      if (existingAddition) {
        return prevAdditions.map((item) =>
          item.addition_id === addition.addition_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevAdditions, { ...addition, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (addition_id) => {
    setSelectedAdditions((prevAdditions) =>
      prevAdditions.map((item) =>
        item.addition_id === addition_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (addition_id) => {
    setSelectedAdditions((prevAdditions) => {
      const newAdditions = prevAdditions
        .map((item) =>
          item.addition_id === addition_id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      if (newAdditions.length < prevAdditions.length) {
        setSelected((prevSelected) => {
          const { [addition_id]: _, ...rest } = prevSelected;
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
              key={addition.addition_id}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={!!selected[addition.addition_id]}
                    onChange={() => handleCheckbox(addition)}
                  />
                  <span>{addition.name}</span>
                </div>
                <span>${addition.price.toLocaleString()}</span>
              </div>
              {selected[addition.addition_id] && (
                <div className="flex flex-row justify-center">
                  <button
                    className="bg-orange-300"
                    onClick={() => decreaseQuantity(addition.addition_id)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="mx-2">
                    {selectedAdditions.find(
                      (item) => item.addition_id === addition.addition_id
                    )?.quantity || 0}
                  </span>
                  <button
                    className="bg-orange-300"
                    onClick={() => increaseQuantity(addition.addition_id)}
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
