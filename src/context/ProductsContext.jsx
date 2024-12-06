import React, { createContext, useState, useEffect } from "react";
import { getProducts, getAdditions } from "../supabase/crudFunctions";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [additions, setAdditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [sauces] = useState([
    "Roja",
    "Verde",
    "BBQ",
    "Piña",
    "Rosada",
    "Showy",
  ]);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [client, setClient] = useState({});
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await getAdditions().then((data) => {
          setAdditions(data);
        });

        await getProducts().then((data) => {
          setFilteredProducts(data);
          setProducts(data);
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product, selectedAdditions, selectedSauces) => {
    const newOrder = {
      id: Date.now(),
      quantity: 1,
      product: {
        id: product.product_id,
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
        setProducts,
        setAdditions,
        additions,
        sauces,
        addToCart,
        cart,
        setCart,
        total,
        setTotal,
        orderCount,
        setOrderCount,
        client,
        setClient,
        loading,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
