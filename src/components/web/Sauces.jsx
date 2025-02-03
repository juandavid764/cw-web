import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const Sauces = ({ setSelectedSauces }) => {
  //Permite desplegar o cerrar las opciones de salsas
  const [isOpen, setIsOpen] = useState(false);

  const changeToggle = () => {
    setIsOpen(!isOpen);
  };

  //Estados inciales de las opciones de salsas
  let defaultOptions = {
    Roja: false,
    Rosada: false,
    Verde: false,
    Showy: false,
    BBQ: false,
    Piña: false,
  };
  let defaultFastOptions = {
    "sin roja": false,
    "sin piña": false,
    "sin verde": false,
  };

  const [fastOptions, setFastOptions] = useState(defaultFastOptions);
  const [options, setOptions] = useState(defaultOptions);

  const handleChangeOptions = (event) => {
    //Evita un renderizado extra
    if (fastOptions !== defaultFastOptions) {
      setFastOptions(defaultFastOptions);
      setCantFastOptionSelected(0);
    }

    //Actualiza el estado de las opciones de salsas
    const { name, checked } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));

  };

  const [cantFastOptionSelected, setCantFastOptionSelected] = useState(0);
  const maxFastOption = 2; // Esta variable no cambia, así que puede quedarse como está

  const handleChangeFastOptions = (event) => {
    const { name, checked } = event.target;

    //Evita un renderizado extra
    if (options !== defaultOptions) {
      setOptions(defaultOptions);
    }


    //Si se quiere gregar una nueva opcion rapida
    if (event.target.checked) {
      if (cantFastOptionSelected === maxFastOption) {

        //Si ya se selecciono el maximo de opciones rapidas, se resetean las opciones rapidas
        setFastOptions(defaultFastOptions);
        setCantFastOptionSelected(1);
      } else {
        setCantFastOptionSelected(cantFastOptionSelected + 1);
      }
    } else {
      setCantFastOptionSelected(cantFastOptionSelected - 1);
    }

    //Actualiza el estado de las opciones rapidas
    setFastOptions((prevFastOptions) => ({
      ...prevFastOptions,
      [name]: checked,
    }));

  };

    // Guarda las opciones de salsas en el contexto 
    useEffect(() => {

      //Filtra la salsas en true
      setSelectedSauces(Object.keys(options).filter((sauce) => options[sauce]));
    }, [options]);

    // Guarda las opciones rapidas de salsas en el contexto 
    useEffect(() => {

      //Filtra la salsas en true
      setSelectedSauces(Object.keys(fastOptions).filter((sauce) => fastOptions[sauce]));
    }, [fastOptions]);

  return (
    <div className="mt-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={changeToggle}
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
          {Object.keys(options).map((option) => (
            <div
              key={option}
              className="flex items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <label>
                <input
                  type="checkbox"
                  className="mr-2 size-5"
                  name={option}
                  checked={options[option]}
                  onChange={handleChangeOptions}
                />
                {option}
              </label>
            </div>
          ))}
          <hr className="w-full  my-2" />
          {Object.keys(fastOptions).map((fastOption) => (
            <div
              key={fastOption}
              className="flex items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <label>
                <input
                  type="checkbox"
                  className="mr-2 size-5"
                  name={fastOption}
                  checked={fastOptions[fastOption]}
                  onChange={handleChangeFastOptions}
                />
                {fastOption}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sauces;
