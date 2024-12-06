// src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "../pages/pages_admin/EditPage";
import RoutesPage from "../pages/pages_admin/RoutesPage"
import AdminRequest from "../pages/pages_admin/AdminRequest";
// Importa otras páginas del administrador aquí

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/editar" element={<EditPage />} />
      <Route path="/admin/rutas" element={<RoutesPage />} />
      <Route path="/admin/pedidos" element={<AdminRequest />} />
      
      {/* Agregar las otras rutas mi chamo*/}
    </Routes>
  );
};

export default AdminRoutes;
