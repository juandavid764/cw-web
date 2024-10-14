import React from "react";
import cwLogo from "../../assets/cwlogo.webp";
import MenuLinks from "../web/MenuLinks";

const AdminNavbar = () => {
  const menuItems = [
    { name: "Pedidos", link: "/admin/pedidos" },
    { name: "Editar", link: "/admin/editar" },
    { name: "Rutas", link: "/admin/rutas" },
  ];

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
    </nav>
  );
};

export default AdminNavbar;
