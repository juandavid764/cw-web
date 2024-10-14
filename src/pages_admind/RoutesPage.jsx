import React, { useState } from 'react';
import { DropdownButton } from '../components/web/routes/DropdownButton';

const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <DropdownButton avalibleOptions={1} />
        </div>
    );
};

export default LoginPage;
