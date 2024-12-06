import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  deleteProduct,
  deleteAddition,
  deleteCategory,
  deleteNeighborhood,
  deleteDomiciliary,
} from "../../../supabase/crudFunctions";

const SimpleInfo = ({ title, info, obj, click, onDelete }) => {
  let deletedId = null;
  //Tenemos la función de eliminar un item, la real no supe como hacer que no se vieran tantos if
  //La idea es que se elimine de acuerdo a lo que se le haya pasado,
  //además de que envie un id eliminado para mostrar un mensaje de confirmación al usuario
  const deleteItem = async () => {
    try {
      if (obj.category_id) {
        await deleteCategory(obj.category_id);
        deletedId = obj.category_id;
      } else if (obj.product_id) {
        await deleteProduct(obj.product_id);
        deletedId = obj.product_id;
      } else if (obj.addition_id) {
        await deleteAddition(obj.addition_id);
        deletedId = obj.addition_id;
      } else if (obj.neighborhood_id) {
        await deleteNeighborhood(obj.neighborhood_id);
        deletedId = obj.neighborhood_id;
      } else if (obj.domiciliary_id) {
        await deleteDomiciliary(obj.domiciliary_id);
        deletedId = obj.domiciliary_id;
      }

      onDelete(deletedId, "delete");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };
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
