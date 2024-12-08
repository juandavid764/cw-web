import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cwLogo from "../../assets/cwlogo.webp";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../supabase/authFuntions";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await login(username, password); // login function from functions.js
      setUser(user); // updating the user in the context
      navigate("/admin/editar"); // redirecting to the editPage
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="min-h-full grow flex items-center justify-center bg-orange-300">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-300">
        <div className="flex justify-center mb-6">
          <img src={cwLogo} alt="Logo" className="w-2/5 h-1/5" />
        </div>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
              placeholder="Ingresa el usuario"
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
              placeholder="Ingresa la contraseña"
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
