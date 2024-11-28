import React, { useState, useContext } from "react";
import ProductForm from "../../components/admin/editComponents/ProductForm";
import SimpleInfo from "../../components/admin/editComponents/SimpleInfo";
import { ProductsContext } from "../../context/ProductsContext";
import ButtonGroup from "../../components/admin/editComponents/ButtonGroup";

const EditPage = () => {
  const { products } = useContext(ProductsContext);

  const [selectedTable, setSelectedTable] = useState("Productos");

  const handleTableChange = (table) => {
    setSelectedTable(table);
  };

  return (
    <div className="flex justify-between">
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
        {/* Lista de productos */}
        {products.map((item, index) => (
          <SimpleInfo
            key={index}
            title={item.name}
            info={selectedTable}
          ></SimpleInfo>
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
