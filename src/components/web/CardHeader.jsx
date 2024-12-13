import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { formatNumber } from "../../utils/utils";

const CardHeader = ({ total, onClose }) => {
  return (
    <div className="flex items-baseline justify-between  top-0 left-0 right-0 ">
      <div className="flex">
        <h2 className="text-lg font-semibold">Total:</h2>
        <span className="text-lg font-semibold ml-2">
          ${formatNumber(total)}
        </span>
      </div>
      <button className="text-gray-500 hover:text-orange-400" onClick={onClose}>
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default CardHeader;
