import React, { useState, useEffect } from "react";
import { insertProduct, updateProduct } from "../../../supabase/crudFunctions"; // Asegúrate de tener una función para actualizar

const ProductForm = ({
  categories,
  productToEdit,
  setProductToEdit,
  reload,
}) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    hasAddition: "no",
    description: "",
    category: "porciones",
    image: null,
  });

  // Al recibir el producto a editar, pre-llenamos el formulario
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name,
        price: productToEdit.price,
        hasAddition: productToEdit.withAddition ? "si" : "no",
        description: productToEdit.description,
        category: productToEdit.category_id,
        image: null,
      });
    } else {
      // Si no hay producto a editar, restablecer el formulario
      resetForm();
    }
  }, [productToEdit]);

  // Función para restablecer el formulario
  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      hasAddition: "no",
      description: "",
      category: "porciones",
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    // console.log(product.image);
    let productData = {
      name: product.name,
      price: parseInt(product.price),
      withAddition: product.hasAddition === "si",
      description: product.description,
      category: product.category,
      file: product.image,
    };

    if (productToEdit) {
      // Si estamos editando, actualizamos el producto y agregamos el id que se trae
      productData.id = productToEdit.product_id;

      await updateProduct(productData);
      reload(productData.id, "update");
    } else {
      await insertProduct(productData);
      reload(null, "insert");
    }
    resetForm();
    setProductToEdit(null);
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-gray-100 w-[800px]"
      onSubmit={submitProduct}
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
          {categories.map((item, index) => (
            <option key={index} value={item.category_id}>
              {item.category_name}
            </option>
          ))}
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
        {productToEdit ? "Actualizar" : "Crear"}
      </button>
      {/* Botón adicional para limpiar el formulario y crear un nuevo producto */}
      {productToEdit && (
        <button
          type="button"
          onClick={() => {
            resetForm();
            setProductToEdit(null);
          }}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
        >
          Nuevo
        </button>
      )}
    </form>
  );
};

export default ProductForm;
