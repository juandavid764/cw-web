import React, { useState, useEffect } from "react";

const GenericForm = ({
  fields, // [{ name: "fieldName", type: "text", label: "Field Label" }]
  onSubmit,
  itemToEdit,
  setItemToEdit,
  reload,
  defaultValues = {}, // Valores por defecto para inicializar el formulario
}) => {
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    } else {
      resetForm();
    }
  }, [itemToEdit]);

  const resetForm = () => setFormData(defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    reload(itemToEdit ? formData.id : null, itemToEdit ? "update" : "insert");
    resetForm();
    setItemToEdit(null);
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-gray-100 w-[800px]"
      onSubmit={handleSubmit}
    >
      {fields.map(({ name, type, label }) => (
        <div key={name} className="mb-4">
          <label className="block font-bold mb-2" htmlFor={name}>
            {label}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
      >
        {itemToEdit ? "Actualizar" : "Crear"}
      </button>
      {itemToEdit && (
        <button
          type="button"
          onClick={() => {
            resetForm();
            setItemToEdit(null);
          }}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
        >
          Nuevo
        </button>
      )}
    </form>
  );
};

export default GenericForm;
