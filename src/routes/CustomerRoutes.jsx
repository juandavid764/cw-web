// src/routes/CustomerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import CostumerPage from "../pages_costumer/CostumerPage";
import AboutUsPage from "../pages_costumer/AboutPage";
import HowAskPage from "../pages_costumer/HowAskPage";
import InfoDeliveryPage from "../pages_costumer/InfoDeliveryPage";
import ShoppingCartPage from "../pages_costumer/shopping_cart/ShoppingCartPage";
import DataCostumerPage from "../pages_costumer/shopping_cart/DataCostumerPage";
import DataDeliveryPage from "../pages_costumer/shopping_cart/DataDeliveryPage";
import LoginPage from "../pages_admin/LoginPage";

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
      <Route path="/Login" element={<LoginPage></LoginPage>} />
    </Routes>
  );
};

export default CustomerRoutes;
