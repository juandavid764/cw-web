import React, { useState } from 'react';
import cwLogo from '../assets/cwlogo.webp';
import ButtonComponent from "../components/web/ButtonComponent"
import { DropdownButton } from '../components/web/routes/DropdownButton';

const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <DropdownButton estados={[{ "En camino": "yellow" }, { "Completado": "green" }, { "Cancelado": "red" }]} />
        </div>
    );
};

export default LoginPage;
