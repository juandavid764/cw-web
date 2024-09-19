import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cwLogo from "../../assets/cwlogo.webp";

// Definir una constante para los elementos del menú
const menuItems = [
  { name: "Menu", link: "/" },
  { name: "Rastrear Pedido", link: "/rastrearPedido" },
  { name: "¿Como Pedir?", link: "/comoPedir" },
  { name: "Nosotros", link: "/nosotros" },
];

const Navbar = () => {
  const location = useLocation(); // Hook que obtiene la ubicación de la ruta
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para la apertura del menú

  // Función para verificar si la ruta actual es la misma que la ruta del enlace
  const isActive = (path) => location.pathname === path;

  // Función para alternar la apertura del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Efecto para añadir o eliminar clases del body al abrir o cerrar el menú
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  // Función para generar enlaces del menú
  const renderMenuLinks = (className, onclick) =>
    menuItems.map((item) => (
      <Link
        key={item.name}
        to={item.link}
        className={`${className} ${
          isActive(item.link) ? "text-orange-500" : "text-gray-300"
        }`}
        onClick={onclick}
      >
        {item.name}
      </Link>
    ));

  return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        <img className="md:max-h-20 max-w-20" src={cwLogo} alt="Cartoon war" />
      </div>

      {/* Menú principal - oculto en pantallas pequeñas */}
      <div className="hidden md:flex space-x-8">
        {renderMenuLinks("text-gray-300 hover:text-orange-500")}
      </div>

      {/* Íconos del alternador del menú móvil */}
      <div className="flex items-center space-x-2 md:hidden">
        {/* Ícono de menú móvil - solo visible en dispositivos móviles */}
        <button
          onClick={toggleMenu}
          className="text-white hover:text-orange-500"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Ícono del carrito - solo visible en pantallas grandes */}
      <div className="hidden md:flex items-center">
        <Link to="/carrito">
          <button
            className={`hover:text-orange-500 ${
              isActive("/carrito") ? "text-orange-500" : "text-white"
            }`}
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
        </Link>
      </div>

      {/* Drawer para el menú móvil */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-black text-white p-8 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Botón de cierre del menú móvil */}
        <button
          onClick={toggleMenu}
          className="text-white hover:text-orange-500 self-end mb-4"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <nav className="flex flex-col items-center space-y-8">
          {renderMenuLinks(
            "text-xl text-gray-300 hover:text-orange-500",
            toggleMenu
          )}

          {/* Ícono del carrito dentro del menú desplegable en móviles */}
          <Link
            to="/carrito"
            onClick={toggleMenu}
            className="text-xl text-gray-300 hover:text-orange-500 flex items-center"
          >
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            Carrito
          </Link>
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
