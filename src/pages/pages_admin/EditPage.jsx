import React, { useState, useContext, useEffect } from "react";
import ProductForm from "../../components/admin/editComponents/ProductForm";
import AdditionForm from "../../components/admin/editComponents/AdditionForm";
import SimpleInfo from "../../components/admin/editComponents/SimpleInfo";
import { ProductsContext } from "../../context/ProductsContext";
import ButtonGroup from "../../components/admin/editComponents/ButtonGroup";
import {
  getProducts,
  getAdditions,
  getCategories,
  getDomiciliaries,
  getNeighborhoods,
} from "../../supabase/crudFunctions";
import CategoryForm from "../../components/admin/editComponents/CategoryForm";
import NeighborhoodForm from "../../components/admin/editComponents/NeighborhoodForm";
import DomiciliaryForm from "../../components/admin/editComponents/DomiciliaryForm";

const EditPage = () => {
  const { products, additions, setProducts, setAdditions } =
    useContext(ProductsContext);
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

  // Función para manejar la eliminación de un item y mostrar mensaje de confirmación al usuario
  const handleReload = async (id, action) => {
    try {
      // Recargar los datos de la tabla seleccionada
      const newData = await fetchTableData(selectedTable);

      switch (selectedTable) {
        case "Productos":
          setProducts(newData);
          break;
        case "Categorías":
          setCategories(newData);
          break;
        case "Adiciones":
          setAdditions(newData);
          break;
        case "Barrios":
          setNeighborhoods(newData);
          break;
        case "Domiciliarios":
          setDomiciliaries(newData);
          break;
        default:
          break;
      }

      // Mostrar mensaje de confirmación dependiendo de la acción realizada
      if (action === "delete") {
        alert(`Item con ID ${id} eliminado de la tabla ${selectedTable}`);
      } else if (action === "update") {
        alert(`Item con ID ${id} actualizado en la tabla ${selectedTable}`);
      } else if (action === "insert") {
        alert(`Item insertado en la tabla ${selectedTable}`);
      }
    } catch (error) {
      console.error("Error al recargar los datos:", error);
      alert("Ocurrió un error al recargar los datos.");
    }
  };

  // Función auxiliar para cargar datos por tabla
  const fetchTableData = async (table) => {
    switch (table) {
      case "Productos":
        return await getProducts();
      case "Categorías":
        return await getCategories();
      case "Adiciones":
        return await getAdditions();
      case "Barrios":
        return await getNeighborhoods();
      case "Domiciliarios":
        return await getDomiciliaries();
      default:
        return [];
    }
  };

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
    <div className="bg-gray-100 flex justify-between w-full">
      {/* Barra lateral */}
      <div className="w-3/5 p-4 flex flex-col items-center h-[800px]">
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
        <div className="flex flex-col w-[80%] h-[600px] overflow-y-scroll scrollbar">
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
              onDelete={handleReload}
            />
          ))}
        </div>
      </div>
      <div className="w-3/5 p-4 flex flex-col items-center">
        <h2 className="font-bold text-xl">Datos</h2>
        {selectedTable === "Productos" && (
          <ProductForm
            categories={categories}
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
            reload={handleReload}
          />
        )}
        {selectedTable === "Adiciones" && (
          <AdditionForm
            additionToEdit={productToEdit} // Reutilizamos el mismo estado para editar adiciones
            setAdditionToEdit={setProductToEdit}
            reload={handleReload}
          />
        )}
        {selectedTable === "Categorías" && (
          <CategoryForm
            categoryToEdit={productToEdit} // Reutilizamos el mismo estado para editar adiciones
            setCategoryToEdit={setProductToEdit}
            reload={handleReload}
          />
        )}
        {selectedTable === "Barrios" && (
          <NeighborhoodForm
            neighborhoodToEdit={productToEdit} // Reutilizamos el mismo estado para editar adiciones
            setNeighborhoodToEdit={setProductToEdit}
            reload={handleReload}
          />
        )}
        {selectedTable === "Domiciliarios" && (
          <DomiciliaryForm
            domiciliaryToEdit={productToEdit} // Reutilizamos el mismo estado para editar adiciones
            setDomiciliaryToEdit={setProductToEdit}
            reload={handleReload}
          />
        )}
      </div>
    </div>
  );
};

export default EditPage;
