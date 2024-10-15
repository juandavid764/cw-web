import React, { useState } from 'react';
import { DropdownButton } from '../components/web/routes_components/DropdownButton';
import { ButtonGroupComponent } from '../components/web/routes_components/ButtonGroupComponent';
import PortalRutas from '../components/web/routes_components/ventana_modal/Portal';


const RoutesPage = () => {
    const titles = ['Juan', 'Santiago', 'Jhon', 'Luigui']
    const pedidos = [1231, 1232, 2, 34, 43]

    function miFuncion(domicliiario) {
        console.log(domicliiario)
    }

    return (
        <div id="modal" className="min-h-screen flex items-center justify-center bg-gray-100">
            <DropdownButton avalibleOptions={1} color={true} />
            <ButtonGroupComponent titles={titles} onClickButton={miFuncion} />
            <PortalRutas domiciliarios={titles} />

        </div>

    );
};

export default RoutesPage;
