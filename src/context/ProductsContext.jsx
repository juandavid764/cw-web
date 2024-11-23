import React, { createContext, useState } from "react";
import { getProducts } from "../supabase/crudFunctions";


export const ProductsContext = createContext();

let variableProducts = await getProducts()
export const ProductsProvider = ({ children }) => {
  const [products] = useState(variableProducts);

  const [additions] = useState([
    { id: 1, name: "Queso Fundido", price: 4000 },
    { id: 2, name: "Pepinillos", price: 7300 },
    { id: 3, name: "Pollo desmechado", price: 8200 },
  ]);

  const [sauces] = useState([
    "Ajo",
    "Tomate",
    "Mostaza",
    "Mayonesa",
    "Tartara",
    "BBQ",
    "Ranch",
  ]);

  //
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Función para agregar un pedido al carrito
  const addToCart = (product, selectedAdditions, selectedSauces) => {
    const newOrder = {
      //id unico para el pedido con la fecha porque no voy a descargar nada mas
      id: Date.now(),
      quantity: 1,
      product: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
      additions: selectedAdditions.map((addition) => ({
        name: addition.name,
        price: addition.price,
        quantity: addition.quantity,
      })),
      sauces: selectedSauces,
    };

    setCart((prevCart) => {
      const updatedCart = [...prevCart, newOrder];
      setOrderCount(updatedCart.length);
      return updatedCart;
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        additions,
        sauces,
        addToCart,
        cart,
        setCart,
        total,
        setTotal,
        orderCount,
        setOrderCount,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
