// Navbar.js
import React, { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cwLogo from "../../assets/cwlogo.webp";
import MenuLinks from "./MenuLinks";

// Definir una constante para los elementos del menu
const menuItems = [
  { name: "Menu", link: "/" },
  { name: "Rastrear Pedido", link: "/rastrearPedido" },
  { name: "¿Como Pedir?", link: "/comoPedir" },
  { name: "Nosotros", link: "/nosotros" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { orderCount } = useContext(ProductsContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        <img className="md:max-h-20 max-w-20" src={cwLogo} alt="Cartoon war" />
      </div>

      {/* Menú principal - oculto en pantallas pequeñas */}
      <div className="hidden md:flex space-x-8">
        <MenuLinks
          menuItems={menuItems}
          className="text-gray-300 font-bold hover:text-orange-300"
        />
      </div>

      {/* contenedor padre de carrito y menu para pantallas pequeñas */}
      <div className="md:hidden flex flex-row gap-2">
        {/* icono del carrito para pantallas pequeñas */}
        <div className="flex items-center">
          <Link to="/carrito">
            <button className="hover:text-orange-300 text-white relative">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute bottom-3 left-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {orderCount}
              </span>
            </button>
          </Link>
        </div>
        {/* Íconos del alternador del menú móvil */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-orange-300"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Ícono del carrito - solo visible en pantallas grandes */}
      <div className="hidden md:flex items-center">
        <Link to="/carrito">
          <button className="hover:text-orange-300 text-white">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute top-3 right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {orderCount}
            </span>
          </button>
        </Link>
      </div>
      
      {/* Drawer para el menú móvil */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-black text-white p-8 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >

        <button
          onClick={toggleMenu}
          className="text-white hover:text-orange-300 self-end mb-4"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <nav className="flex flex-col items-center space-y-8">
          <MenuLinks
            menuItems={menuItems}
            className="text-xl text-gray-300 hover:text-orange-300"
            onClick={toggleMenu}
          />
          {/* <Link
            to="/carrito"
            onClick={toggleMenu}
            className="text-xl text-gray-300 hover:text-orange-300 flex items-center"
          >
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            Carrito
          </Link> */}
        </nav>
      </div>

      {/* Backdrop para bloquear la interacción con el fondo */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
