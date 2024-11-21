import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

const Quantity = ({ order }) => {
  const { cart, setCart, setOrderCount } = useContext(ProductsContext);

  // Función para manejar el cambio de cantidad
  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const increaseQuantity = () => {
    updateQuantity(order.id, order.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (order.quantity > 1) {
      updateQuantity(order.id, order.quantity - 1);
    }
  };

  if (!order || !order.product) {
    return console.log(cart);
  }
  const removeItem = () => {
    setCart(cart.filter((item) => item.id !== order.id));
    setOrderCount(cart.length - 1);
  };

  return (
    <div className=" flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      <img
        src={order.product.image}
        alt={order.product.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-base font-semibold">{order.product.name}</h3>
        <div className="flex items-center  ">
          <button onClick={decreaseQuantity} className="px-2">
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="mx-2">{order.quantity}</span>
          <button onClick={increaseQuantity} className="px-2">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-base font-semibold">
        ${(order.product.price * order.quantity).toLocaleString()}
      </div>
      <button
        onClick={removeItem}
        className="ml-4 bg-orange-400 rounded-full p-2  hover:bg-orange-300"
      >
        <TrashIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default Quantity;
