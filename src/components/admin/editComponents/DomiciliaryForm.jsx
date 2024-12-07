import React from "react";
import {
  insertDomiciliary,
  updateDomiciliary,
} from "../../../supabase/crudFunctions"; // Asegúrate de tener estas funciones CRUD
import GenericForm from "./GenericForm"; // Importa el componente genérico

const DomiciliaryForm = ({
  domiciliaryToEdit,
  setDomiciliaryToEdit,
  reload,
}) => {
  const fields = [
    { name: "name", type: "text", label: "Nombre del Domiciliario" },
  ];

  const handleDomiciliarySubmit = async (data) => {
    if (domiciliaryToEdit) {
      data.id = domiciliaryToEdit.domiciliary_id;
      await updateDomiciliary(data);
    } else {
      await insertDomiciliary(data);
    }
  };

  return (
    <GenericForm
      fields={fields}
      onSubmit={handleDomiciliarySubmit}
      itemToEdit={domiciliaryToEdit}
      setItemToEdit={setDomiciliaryToEdit}
      reload={reload}
      defaultValues={{ name: "" }}
    />
  );
};

export default DomiciliaryForm;
