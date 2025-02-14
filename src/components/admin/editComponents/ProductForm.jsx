import React, { useState, useEffect, useRef } from "react";
import { insertProduct, updateProduct } from "../../../supabase/crudFunctions"; // Asegúrate de tener una función para actualizar

import ImageUpload from "./ImageUpload";

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
    category: 0,
    image: null,
    currentImageUrl: null, // URL de la imagen actual
  });
  const imageUploadRef = useRef(null); // Define el ref para ImageUpload

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name,
        price: productToEdit.price,
        hasAddition: productToEdit.withAddition ? "si" : "no",
        description: productToEdit.description,
        category: productToEdit.category,
        image: null,
        currentImageUrl: productToEdit.imgUrl || null, // Carga la URL existente
      });
    } else {
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
      currentImageUrl: null,
    });

    imageUploadRef.current.reset();
  };

  const handleUpload = async (imageFile, oldImageUrl = null) => {
    if (!imageFile) return null; // Si no hay imagen nueva, no hacemos nada

    const formData = new FormData();
    formData.append("imagen", imageFile); // Agregamos la nueva imagen
    if (oldImageUrl) formData.append("oldImageUrl", oldImageUrl); // Si hay una imagen antigua, la enviamos para que la elimine

    try {
      const response = await fetch(
        "https://cartoonwarfastfood.com/upload_image.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Imagen subida:", data.url);
        return data.url; // Retornamos la URL de la imagen subida
      } else {
        alert(data.error || "Error al subir la imagen");
        return null;
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al conectar con el servidor");
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (imageUrl) => {
    setProduct({ ...product, image: imageUrl });
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    let imageUrl = product.currentImageUrl; // Usamos la imagen actual por defecto

    // Si hay una nueva imagen, la subimos primero con la funcin que conecta con la carpeta de hostinger
    if (product.image instanceof File) {
      const uploadedImageUrl = await handleUpload(
        product.image,
        productToEdit?.imgUrl
      ); //Se pregunta si hay una imgUrl y con ella se eliminará la imagen anterior
      if (uploadedImageUrl) imageUrl = uploadedImageUrl; // Usamos la URL retornada por el servidor
    }

    let productData = {
      name: product.name,
      price: parseInt(product.price) || 0,
      withAddition: product.hasAddition === "si",
      description: product.description,
      category: product.category,
      file: imageUrl,
    };

    if (productToEdit) {
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
        <label className="block font-bold mb-2" htmlFor="name">
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
        <label className="block font-bold mb-2" htmlFor="price">
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
          ¿Lleva adición?
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
        <ImageUpload
          onImageSelect={handleImageChange}
          ref={imageUploadRef}
          currentImageUrl={product.currentImageUrl}
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
