import React, { useState } from 'react';
import { ButtonGroupComponent } from '../../components/admin/routesComponents/ButtonGroupComponent';
import PortalRutas from '../../components/admin/routesComponents/ventana_modal/Portal';
import CardRoute from '../../components/admin/routesComponents/CardRoute';
import ProductList from "../../components/admin/routesComponents/ProductList"


const RoutesPage = () => {
    const titles = ['Juan', 'Santiago', 'Jhon', 'Luigui']
    const pedidos = [1231, 1232, 2, 34, 43]

    const routes = Array.from({ length: 20 }, (_, index) => ({
        idRuta: index + 1,
        Domiciliario: `Mensajero ${index + 1}`,
        pedidos: Array.from({ length: 3 }, () => Math.floor(Math.random() * 10000))
    }));

    function miFuncion(domicliiario) {
        console.log(domicliiario)
    }

    return (
        /// Todo: Aliear botones y agrandar el button group
        <div id="modal" className="min-h-screen flex flex-col justify-start p-10 bg-gray-100">
            <div className='flex flex-row justify-between px-11 py-3'>
                <ButtonGroupComponent titles={titles} onClickButton={miFuncion} />
                {/* PortalRutas Boton de crear rutas */}
                <PortalRutas domiciliarios={titles} idPedidos={pedidos} />
            </div>
            <div className="min-h-screen flex  justify-center flex-row bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-1">
                    {/* <div className="flex flex-wrap justify-center gap-4"> */}
                    {routes.map((route) => (
                    <div key={route.idRuta} className="flex-grow">
                        <CardRoute route={route} />
                    </div>
                ))}
                </div>
            </div>
            
        </div>

    );
};

export default RoutesPage;
