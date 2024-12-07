import React from "react";
import {
  insertCategory,
  updateCategory,
} from "../../../supabase/crudFunctions"; // Asegúrate de definir estas funciones
import GenericForm from "./GenericForm"; // Importa el componente genérico

const CategoryForm = ({ categoryToEdit, setCategoryToEdit, reload }) => {
  const fields = [
    { name: "category_name", type: "text", label: "Nombre de la Categoría" },
  ];

  const handleCategorySubmit = async (data) => {
    if (categoryToEdit) {
      data.id = categoryToEdit.category_id;
      await updateCategory(data);
    } else {
      await insertCategory(data);
    }
  };

  return (
    <GenericForm
      fields={fields}
      onSubmit={handleCategorySubmit}
      itemToEdit={categoryToEdit}
      setItemToEdit={setCategoryToEdit}
      reload={reload}
      defaultValues={{ category_name: "" }}
    />
  );
};

export default CategoryForm;
