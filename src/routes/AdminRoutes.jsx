// src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "../pages/pages_admin/EditPage";
import RoutesPage from "../pages/pages_admin/RoutesPage"
// Importa otras páginas del administrador aquí

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/editar" element={<EditPage />} />
      <Route path="/admin/rutas" element={<RoutesPage />} />
      {/* Agregar las otras rutas mi chamo*/}
    </Routes>
  );
};

export default AdminRoutes;
