// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumerPage from "./pages/CostumerPage";
import AboutUsPage from "./pages/AboutPage";
import Navbar from "./components/web/Navbar";


function App() {
  return (
    <Router>
      {/* Componente de navegacion principal */}
      <Navbar />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<CostumerPage />} />
        <Route path="/nosotros" element={<AboutUsPage />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
