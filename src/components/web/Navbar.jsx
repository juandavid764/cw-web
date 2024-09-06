import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SegmentIcon from "@mui/icons-material/Segment";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import { orange } from "@mui/material/colors";
import cwLogo from "../../assets/cwlogo.webp";

// Define a constant for menu items
const menuItems = [
  { name: "Menu", link: "/" },
  { name: "Rastrear Pedido", link: "/rastrearPedido" },
  { name: "¿Como Pedir?", link: "/comoPedir" },
  { name: "Nosotros", link: "/nosotros" },
];

const Navbar = () => {
  const location = useLocation(); // Hook that gets route location

  // Function to check if the current route is the same as the link route
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Function to generate menu links
  const renderMenuLinks = (className, onclick) =>
    menuItems.map((item) => (
      <Link
        key={item.name}
        to={item.link}
        className={className}
        onClick={onclick}
      >
        {item.name}
      </Link>
    ));

  return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        <img
          className="md:max-h-20 max-w-20"
          src={cwLogo}
          alt="Cartoon war"
        ></img>
      </div>

      {/* Middle Menu - hidden on small screens */}
      <div className="hidden md:flex space-x-8">
        {renderMenuLinks("text-gray-300 hover:text-orange-500")}
      </div>

      {/* Cart Icon and Mobile Menu Toggle */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Mobile Menu Icon - only visible on mobile */}
        <Button
          onClick={toggleMenu}
          sx={{
            color: "white",
            "&:hover .MuiSvgIcon-root": {
              color: orange[500],
            },
            display: { md: "none" },
          }}
        >
          <SegmentIcon />
        </Button>

        {/* Cart Icon */}
        <Link to="/carrito">
          <Button
            sx={{
              color: "white",
              "&:hover .MuiSvgIcon-root": {
                color: orange[500],
              },
            }}
          >
            <ShoppingCartIcon
              sx={{ color: isActive("/carrito") ? orange[500] : "white" }}
            />
          </Button>
        </Link>
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
        <div className="w-64 h-full bg-black text-white p-8 flex flex-col">
          <Button
            onClick={toggleMenu}
            sx={{
              alignSelf: "flex-end",
              color: "white",
              "&:hover .MuiSvgIcon-root": {
                color: orange[500],
              },
            }}
          >
            <CloseIcon />
          </Button>
          <nav className="flex flex-col items-center space-y-8 mt-8">
            {renderMenuLinks(
              "text-xl text-gray-300 hover:text-orange-500",
              toggleMenu
            )}
          </nav>
        </div>
      </Drawer>

      {/* Backdrop for blocking interaction with the background */}
      <Backdrop
        sx={{ color: "#fff", zIndex: 10 }}
        open={isMenuOpen}
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;
