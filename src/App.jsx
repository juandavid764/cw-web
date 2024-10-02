// src/App.jsx no se que está
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumerPage from "./pages/CostumerPage";
import AboutUsPage from "./pages/AboutPage";
import HowAskPage from "./pages/HowAskPage";
import InfoDeliveryPage from "./pages/InfoDeliveryPage";
import Navbar from "./components/web/Navbar";
import { ProductsProvider } from "./context/ProductsContext";

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

          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
