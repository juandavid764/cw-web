import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteProduct } from "../../../supabase/crudFunctions";

const SimpleInfo = ({ title, info, obj, click }) => {
  function deleteItem() {
    if (obj.category_id) {
      deleteProduct(obj.category_id);
    } else if (obj.product_id) {
      deleteProduct(obj.product_id);
    } else if (obj.addition_id) {
      deleteProduct(obj.addition_id);
    } else if (obj.neighborhood_id) {
      deleteProduct(obj.neighborhood_id);
    } else if (obj.domiciliary_id) {
      deleteProduct(obj.domiciliary_id);
    }
  }
  return (
    <div className=" flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2  transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex items-center justify-between w-full" onClick={click}>
        <div className="flex-1 ml-4">
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <div className="text-base font-semibold">{info}</div>
      </div>

      <button
        onClick={() => deleteItem()}
        className="ml-4 bg-orange-400 rounded-full p-2  hover:bg-orange-300"
      >
        <TrashIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default SimpleInfo;
