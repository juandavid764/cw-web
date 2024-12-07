import React from "react";
import {
  insertNeighborhood,
  updateNeighborhood,
} from "../../../supabase/crudFunctions"; // Asegúrate de tener estas funciones CRUD
import GenericForm from "./GenericForm"; // Importa el componente genérico

const NeighborhoodForm = ({
  neighborhoodToEdit,
  setNeighborhoodToEdit,
  reload,
}) => {
  const fields = [
    { name: "name", type: "text", label: "Nombre del Barrio" },
    { name: "delivery_price", type: "number", label: "Precio de Entrega" },
  ];

  const handleNeighborhoodSubmit = async (data) => {
    if (neighborhoodToEdit) {
      data.id = neighborhoodToEdit.neighborhood_id;
      await updateNeighborhood(data);
    } else {
      await insertNeighborhood(data);
    }
  };

  return (
    <GenericForm
      fields={fields}
      onSubmit={handleNeighborhoodSubmit}
      itemToEdit={neighborhoodToEdit}
      setItemToEdit={setNeighborhoodToEdit}
      reload={reload}
      defaultValues={{ name: "", delivery_price: "" }}
    />
  );
};

export default NeighborhoodForm;
