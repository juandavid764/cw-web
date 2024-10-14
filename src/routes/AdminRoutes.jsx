// src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "../pages_admin/EditPage";
// Importa otras páginas del administrador aquí

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/editar" element={<EditPage />} />
      {/* Agregar las otras rutas mi chamo*/}
    </Routes>
  );
};

export default AdminRoutes;
