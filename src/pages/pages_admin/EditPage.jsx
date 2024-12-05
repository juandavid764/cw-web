import React, { useState, useContext, useEffect } from "react";
import ProductForm from "../../components/admin/editComponents/ProductForm";
import SimpleInfo from "../../components/admin/editComponents/SimpleInfo";
import { ProductsContext } from "../../context/ProductsContext";
import ButtonGroup from "../../components/admin/editComponents/ButtonGroup";
import {
  getCategories,
  getDomiciliaries,
  getNeighborhoods,
} from "../../supabase/crudFunctions";

const EditPage = () => {
  const { products, additions } = useContext(ProductsContext);
  const [categories, setCategories] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [domiciliaries, setDomiciliaries] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  // Estado para manejar qué tabla se está mostrando en la vista
  const [selectedTable, setSelectedTable] = useState("Productos");

  // Carga de datos al inicializar el componente con useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, neighborhoodData, domiciliaryData] =
          await Promise.all([
            getCategories(),
            getNeighborhoods(),
            getDomiciliaries(),
          ]);

        setCategories(categoryData);
        setNeighborhoods(neighborhoodData);
        setDomiciliaries(domiciliaryData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Mapeo de datos en función de la tabla seleccionada para cambiar entre uno y otro
  const getDataForSelectedTable = () => {
    switch (selectedTable) {
      case "Productos":
        return products;
      case "Categorías":
        return categories;
      case "Adiciones":
        return additions;
      case "Barrios":
        return neighborhoods;
      case "Domiciliarios":
        return domiciliaries;
      default:
        return [];
    }
  };

  const getIdKey = (table) => {
    switch (table) {
      case "Productos":
        return "product_id";
      case "Categorías":
        return "category_id";
      case "Adiciones":
        return "addition_id";
      case "Barrios":
        return "neighborhood_id";
      case "Domiciliarios":
        return "domiciliary_id";
      default:
        return "id"; // valor por defecto de la llave primaria
    }
  };

  // Función para manejar la selección de un producto
  const handleProductSelect = (product) => {
    setProductToEdit(product); // Actualizamos el producto a editar
  };

  // Manejo del cambio de tabla seleccionada
  const handleTableChange = (table) => {
    setSelectedTable(table);
  };

  const dataToDisplay = getDataForSelectedTable();

  return (
    <div className="flex justify-between">
      {/* Barra lateral */}
      <div className="w-2/5 p-4">
        <ButtonGroup
          options={[
            "Productos",
            "Categorías",
            "Adiciones",
            "Barrios",
            "Domiciliarios",
          ]}
          selected={selectedTable}
          onSelect={handleTableChange}
        />
        {dataToDisplay.map((item, index) => (
          <SimpleInfo
            key={index}
            title={
              item.name ||
              item.title ||
              item.category_name ||
              `Item ${index + 1}`
            }
            info={item[getIdKey(selectedTable)] || item.info || selectedTable}
            obj={item}
            click={() => handleProductSelect(item)}
          />
        ))}
      </div>
      <div className="w-3/5 p-4 flex flex-col items-center">
        <h2 className="font-bold text-xl">Datos</h2>
        {selectedTable === "Productos" && (
          <ProductForm
            categories={categories}
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
          />
        )}
      </div>
    </div>
  );
};

export default EditPage;
