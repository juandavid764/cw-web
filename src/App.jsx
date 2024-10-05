// src/App.jsx no se que está
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumerPage from "./pages_costumer/CostumerPage";
import AboutUsPage from "./pages_costumer/AboutPage";
import HowAskPage from "./pages_costumer/HowAskPage";
import InfoDeliveryPage from "./pages_costumer/InfoDeliveryPage";
import Navbar from "./components/web/Navbar";
import { ProductsProvider } from "./context/ProductsContext";
import LoginPage from "./LoginPage";

function App() {
  return (
    <ProductsProvider>
      <Router>
        {/* Componente de navegacion principal */}
        <Navbar />

        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<CostumerPage />} />
          <Route path="/nosotros" element={<AboutUsPage />} />
          <Route path="/comoPedir" element={<HowAskPage />} />
          <Route path="/rastrearPedido" element={<InfoDeliveryPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
