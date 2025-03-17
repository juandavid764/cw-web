import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import cwLogo from "../../assets/cwlogo.webp";
import MenuLinks from "../web/MenuLinks";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const menuItemsDesktop = [
    { name: "Pedidos", link: "/admin/pedidos" },
    { name: "Rutas", link: "/admin/rutas" },
    { name: "Editar", link: "/admin/editar" },
    { name: "Estadisticas", link: "/admin/estadisticas" },
  ];

  const menuItemsMobile = [
    { name: "Rutas", link: "/admin/rutas" },
    { name: "Estadisticas", link: "/admin/estadisticas" },
  ];

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
        <img className="h-10 w-10" src={cwLogo} alt="Cartoon war" />
      </div>

      {/* Menú principal - oculto en móvil */}
      <div className="hidden md:flex space-x-8">
        <MenuLinks
          menuItems={menuItemsDesktop}
          className="text-gray-300 font-bold hover:text-orange-300"
        />
      </div>

      {/* Contenedor desktop: Logout */}
      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={signOut}
          className="hover:text-orange-300 text-white flex items-center gap-2"
        >
          <span>Cerrar Sesión</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={toggleMenu}
          className="text-white hover:text-orange-300"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer móvil */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-black p-6 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-[1000]`}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-orange-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <MenuLinks
            menuItems={menuItemsMobile}
            className="text-gray-300 hover:text-orange-300 text-lg"
            onClick={toggleMenu}
          />
          
          <button
            onClick={() => {
              toggleMenu();
              signOut();
            }}
            className="w-full py-2 text-white hover:bg-orange-300/10 rounded-md flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]" 
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default AdminNavbar;