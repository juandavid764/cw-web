import React, { useState } from "react";
import ProductForm from "../components/admin/editComponents/ProductForm";
import SimpleInfo from "../components/admin/editComponents/SimpleInfo";

const EditPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    hasAdditions: false,
    type: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, hasAdditions: e.target.checked });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la edición/guardar el formulario
    console.log(formData);
  };

  return (
    <div className="flex justify-between">
      <div className="w-2/5 p-4">
        <h2 className="font-bold mb-4 text-xl">Productos</h2>
        {/* Lista de productos */}
        {[1, 2, 3, 4].map((item, index) => (
          <SimpleInfo key={index} title="onichan" info={"onichan"}></SimpleInfo>
        ))}
      </div>
      <div className="w-3/5 p-4 flex flex-col items-center">
        <h2 className="font-bold text-xl">Datos</h2>
        <ProductForm></ProductForm>
      </div>
    </div>
  );
};

export default EditPage;
