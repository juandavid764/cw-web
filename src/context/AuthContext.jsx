import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession, logout } from "../supabase/crudFunctions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    fetchSession();
  }, []);

  const signOut = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
