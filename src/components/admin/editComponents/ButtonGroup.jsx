import React from "react";

const ButtonGroup = ({ options, selected, onSelect }) => {
  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-lg hover:bg-orange-200 ${
            selected === option
              ? "bg-orange-400 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
