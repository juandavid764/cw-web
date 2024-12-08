import React, { useEffect, useState, useContext } from "react";
import { getCategories } from "../../supabase/crudFunctions";
import { ProductsContext } from "../../context/ProductsContext";

const LoadingMessage = () => (
  <p className="text-white">Cargando categorías...</p>
);

const SecondaryMenu = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para categoría seleccionada
  const { products, setFilteredProducts } = useContext(ProductsContext);

  useEffect(() => {
    getCategories().then((data) => {
      setCategorias(data);
      console.log(data);
    });
  }, []);

  const filterCategorySelected = (id) => {
    const productsNow = products.filter((producto) => producto.category === id);
    setFilteredProducts(productsNow);
    setSelectedCategory(id);
  };

  return (
    <nav className="bg-black shadow-md p-4 flex justify-center items-center relative">
      <div className="flex space-x-8 md:p-2 md:space-x-20">
        {categorias.length === 0 ? (
          <LoadingMessage />
        ) : (
          categorias.map((categoria) => (
            <button
              key={categoria.category_id}
              onClick={() => filterCategorySelected(categoria.category_id)} // Cambia la categoría seleccionada
              className={`${
                selectedCategory === categoria.category_id
                  ? "text-orange-300 font-bold" // Estilo para categoría seleccionada
                  : "text-gray-300 font-bold hover:text-orange-300"
              }`}
            >
              {categoria.category_name}
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default SecondaryMenu;
