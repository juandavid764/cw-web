import React, { useState } from 'react';
import { ButtonGroupComponent } from '../../components/admin/routesComponents/ButtonGroupComponent';
import PortalRutas from '../../components/admin/routesComponents/ventana_modal/Portal';
import CardRoute from '../../components/admin/routesComponents/CardRoute';
import ProductList from "../../components/admin/routesComponents/ProductList"


const RoutesPage = () => {
    const titles = ['Juan', 'Santiago', 'Jhon', 'Luigui']
    const pedidos = [1231, 1232, 2, 34, 43]

    function miFuncion(domicliiario) {
        console.log(domicliiario)
    }

    return (
        <div id="modal" className="min-h-screen flex flex-col justify-start p-10 bg-gray-100">
            <div className='flex flex-row justify-between'>
                <ButtonGroupComponent titles={titles} onClickButton={miFuncion} />
                {/* PortalRutas Boton de crear rutas */}
                <PortalRutas domiciliarios={titles} idPedidos={pedidos} />
            </div>
            <div>
                <CardRoute />

            </div>
        </div>

    );
};

export default RoutesPage;
