import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardsContainer = () => {
  const [products, setProducts] = useState([]);

  /**  Simulación de consulta a base de datos (Esto es un ejemplo que vi, no se como se usa mi socito)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/products"); //No se a que se refier con la ruta xd
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []); **/

  const mockProducts = [
    {
      id: 1,
      image:
        "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A842PA4459PT28D325106498W8333H10000/views/1,width=378,height=378,appearanceId=842,backgroundColor=F2F2F2/fanatico-de-las-hamburguesas-amante-de-la-comida-rapida-papas-fritas.jpg",
      name: "Basica y linda",
      description:
        "Esta es la mitica de todo villano, cuando quieres hacer maladades de chill",
      price: 20000,
      category: "Salchipapas",
    },
    {
      id: 2,
      image:
        "https://www.shutterstock.com/image-vector/salchipapa-street-food-typical-traditional-260nw-1912687591.jpg",
      name: "La familiar",
      description:
        "Perfecta para cuando llega todo el combo de villanos, para compartir y planear el siguiente ataque",
      price: 40000,
      category: "Salchipapas",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-salchipapa_23-2148792765.jpg",
      name: "La maligna",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: 18000,
      category: "Salchipapas",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-salchipapa_52683-52597.jpg",
      name: "SalchiSalchi",
      description:
        "Esto es una descripcion bien insana de esta increible salchipapa con la cual vas a disfrutar muchisimo",
      price: 21000,
      category: "Salchipapas",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-salchipapa_52683-52597.jpg",
      name: "Producto 5",
      description: "Descripción breve del producto 4.",
      price: 21000,
      category: "Salchipapas",
    },
  ];

  // Simula la carga de datos
  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
