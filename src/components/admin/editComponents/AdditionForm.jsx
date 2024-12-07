import React, { useState, useEffect } from "react";
import {
  insertAddition,
  updateAddition,
} from "../../../supabase/crudFunctions"; // Asegúrate de tener las funciones CRUD definidas

const AdditionForm = ({ additionToEdit, setAdditionToEdit, reload }) => {
  const [addition, setAddition] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    if (additionToEdit) {
      setAddition({
        name: additionToEdit.name,
        price: additionToEdit.price,
      });
    } else {
      resetForm();
    }
  }, [additionToEdit]);

  // Función para restablecer el formulario
  const resetForm = () => {
    setAddition({
      name: "",
      price: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddition({ ...addition, [name]: value });
  };

  const submitAddition = async (e) => {
    e.preventDefault();

    let additionData = {
      name: addition.name,
      price: parseInt(addition.price),
    };

    if (additionToEdit) {
      // Si estamos editando
      additionData.id = additionToEdit.addition_id;
      await updateAddition(additionData);
      reload(additionData.id, "update");
    } else {
      // Crear nueva adición
      await insertAddition(additionData);
      reload(null, "insert");
    }

    resetForm();
    setAdditionToEdit(null);
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-gray-100 w-[800px]"
      onSubmit={submitAddition}
    >
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={addition.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="price">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={addition.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
      >
        {additionToEdit ? "Actualizar" : "Crear"}
      </button>
      {/* Botón adicional para limpiar el formulario y crear una nueva adición */}
      {additionToEdit && (
        <button
          type="button"
          onClick={() => {
            resetForm();
            setAdditionToEdit(null);
          }}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
        >
          Nuevo
        </button>
      )}
    </form>
  );
};

export default AdditionForm;
