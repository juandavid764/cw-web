// src/routes/CustomerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import CostumerPage from "../pages/pages_costumer/CostumerPage";
import AboutUsPage from "../pages/pages_costumer/AboutPage";
import HowAskPage from "../pages/pages_costumer/HowAskPage";
import InfoDeliveryPage from "../pages/pages_costumer/InfoDeliveryPage";
import ShoppingCartPage from "../pages/pages_costumer/shopping_cart/ShoppingCartPage";
import DataCostumerPage from "../pages/pages_costumer/shopping_cart/DataCostumerPage";
import DataDeliveryPage from "../pages/pages_costumer/shopping_cart/DataDeliveryPage";
import LoginPage from "../pages/pages_admin/LoginPage";
import RoutesPage from "../pages/pages_admin/RoutesPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CostumerPage />} />
      <Route path="/nosotros" element={<AboutUsPage />} />
      <Route path="/comoPedir" element={<HowAskPage />} />
      <Route path="/rastrearPedido" element={<InfoDeliveryPage />} />
      <Route path="/carrito" element={<ShoppingCartPage />} />
      <Route path="/carrito/infoUsuario" element={<DataCostumerPage />} />
      <Route path="/carrito/infoPedido" element={<DataDeliveryPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Login/rutas" element={<RoutesPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
