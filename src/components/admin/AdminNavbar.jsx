import React from "react";
import cwLogo from "../../assets/cwlogo.webp";
import MenuLinks from "../web/MenuLinks";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const menuItems = [
    { name: "Pedidos", link: "/admin/pedidos" },
    { name: "Editar", link: "/admin/editar" },
    { name: "Rutas", link: "/admin/rutas" },
  ];

  const { signOut } = useAuth();

  return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center relative">
      <div className="text-2xl font-bold text-white">
        <img className="md:max-h-20 max-w-20" src={cwLogo} alt="Cartoon war" />
      </div>
      <div className="hidden md:flex space-x-8">
        <MenuLinks
          menuItems={menuItems}
          className="text-gray-300 hover:text-orange-300"
        />
      </div>
      <div className="hidden md:flex items-center">
        <button className="hover:text-orange-300 text-white" onClick={signOut}>
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
    </nav>
  );
};

export default AdminNavbar;
