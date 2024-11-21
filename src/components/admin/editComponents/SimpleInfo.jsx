import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const SimpleInfo = ({ title, info }) => {
  function selected(product) {
    console.log("Seleccionado", product);
  }
  return (
    <div
      className=" flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2  transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => selected(product)}
    >
      <div className="flex-1 ml-4">
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="text-base font-semibold">{info}</div>
      <button
        onClick={() => console.log("Editando")}
        className="ml-4 bg-orange-400 rounded-full p-2  hover:bg-orange-300"
      >
        <TrashIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default SimpleInfo;
