import React, { useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    hasAddition: "no",
    description: "",
    category: "porciones",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product submitted:", product);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white w-[800px]"
    >
      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="price">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="hasAddition">
          Lleva adición?
        </label>
        <select
          id="hasAddition"
          name="hasAddition"
          value={product.hasAddition}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="no">No</option>
          <option value="si">Sí</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="category">
          Categoría
        </label>
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="porciones">Porciones</option>
          <option value="salchipapa">Salchipapa</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block  font-bold mb-2" htmlFor="image">
          Adjuntar Imagen
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
      >
        Crear Producto
      </button>
    </form>
  );
};

export default ProductForm;
