// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  // Simulación de inicio de sesión (puede ser sustituido por una llamada real a una API)
  const login = (userData) => {
    setUser(userData);
  };

  // Simulación de cierre de sesión
  const logout = () => {
    setUser(null);
  };

  // Determinamos si el usuario es administrador
  const isAdmin = user?.role === "admin";

  // Valores proporcionados por el contexto
  const value = {
    user,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
