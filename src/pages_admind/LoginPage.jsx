import React, { useState } from 'react';
import cwLogo from '../assets/cwlogo.webp';
import ButtonComponent from "../components/web/ButtonComponent"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de inicio de sesión.

        console.log('Usuario:', username, 'Contraseña:', password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md">

                <div className="flex justify-center mb-6">
                    <img src={cwLogo} alt="Logo" className=" w-2/5 h-1/5" />
                </div>

                {/* Formulario de Login */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
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
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
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
                    <div className='flex flex-row justify-center'>
                        <ButtonComponent title={"Iniciar Sesión"}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
