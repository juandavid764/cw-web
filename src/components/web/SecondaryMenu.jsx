import React from "react";
import MenuLinks from "./MenuLinks";

//Aqui lo que tendríamos que hacer es importar y mostrar los links que se encuentran en la base de datos (Que son productos)
const secondaryMenuItems = [
  { name: "Porciones", link: "/porciones" },
  { name: "Salchipapas", link: "/salchipapas" },
  { name: "Bebidas", link: "/bebidas" },
];

const SecondaryMenu = () => {
  return (
    <nav className="bg-black shadow-md p-4 flex justify-center items-center relative">
      <div className="flex space-x-8 md:p-2 md:space-x-20">
        <MenuLinks
          menuItems={secondaryMenuItems}
          className="text-gray-300 hover:text-orange-500"
        />
      </div>
    </nav>
  );
};

export default SecondaryMenu;
