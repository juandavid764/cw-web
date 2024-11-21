import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cwLogo from "../assets/cwlogo.webp";
import ButtonComponent from "../components/web/ButtonComponent";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión.
    console.log("Usuario:", username, "Contraseña:", password);

    // Simulación de autenticación con un usuario administrador
    const adminUser = { name: "Admin", role: "admin" };
    login(adminUser);

    // Si el usuario es administrador, redirigimos a la página de edición
    if (adminUser.role === "admin") {
      navigate("/admin/editar");
    } else {
      alert("Acceso denegado: No tienes permisos de administrador.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-orange-300">
        <div className="flex justify-center mb-6">
          <img src={cwLogo} alt="Logo" className="w-2/5 h-1/5" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-orange-300"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-300"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="bg-orange-400 text-white px-6 py-2 rounded-md hover:bg-orange-300"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
