// MenuLinks.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuLinks = ({ menuItems, className, onClick }) => {
  const location = useLocation();

  // Verifica si la ruta actual es la misma que la ruta del enlace
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          className={`${className} ${isActive(item.link) ? "text-orange-300" : "text-gray-300"
            }`}
          onClick={onClick}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default MenuLinks;
