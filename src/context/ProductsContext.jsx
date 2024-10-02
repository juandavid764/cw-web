import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products] = useState([
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
    {
      id: 6,
      name: "Especial Personal",
      description: "Es una salchipapa bien aspera que te deja saciado...",
      price: 18000,
      image: "https://via.placeholder.com/150",
    },
    // Agrega más productos si lo deseas
  ]);

  const [additions] = useState([
    { name: "Queso Fundido", price: 12000 },
    { name: "Pepinillos", price: 4000 },
    { name: "Pollo desmechado", price: 7300 },
  ]);

  return (
    <ProductsContext.Provider value={{ products, additions }}>
      {children}
    </ProductsContext.Provider>
  );
};
