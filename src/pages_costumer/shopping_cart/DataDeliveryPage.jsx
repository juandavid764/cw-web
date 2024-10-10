import React, { useState } from 'react';
import ButtonComponent from "../components/web/ButtonComponent"

const DataDeliveryPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* Shopping cart client info Delivery*/}
            <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-orange-300">
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">Datos Domicilio</h2>
                <div className='flex flex-row justify-between'>
                    <h3 className="text-left font-semibold  text-gray-700">Subtotal:</h3>
                    <h3 className="text-right font-semibold mb-6 text-gray-700">$20.000</h3>
                </div>


                {/*  */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}

                            className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-orange-300"
                            placeholder="¿Quién recibe el pedido?"
                        />
                    </div>
                    <div className="mb-4">
                        <label for="neighborhoods" className="block text-gray-700 font-semibold mb-2">Barrio:</label>
                        <select id="neighborhoods" name="cars" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-300 focus:border-orange-500 sm:text-sm rounded-md">
                            <option value="Vallado">Vallado</option>
                            <option value="Morichal">Morichal</option>
                            <option value="Cuidad Cordoba">Cuidad Cordoba</option>
                            <option value="Caney">Caney</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Dirección
                        </label>
                        <input
                            type="text"
                            id="ddress"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}

                            className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-orange-300"
                            placeholder="Calle 51 # 40c-03"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}

                            className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-orange-300"
                            placeholder="3165684544"
                        />
                    </div>
                    <div className="mb-4">
                        <label for="payment" className="block text-gray-700 font-semibold mb-2">Forma de pago:</label>
                        <select id="payment" name="cars" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-300 focus:border-orange-500 sm:text-sm rounded-md">
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Con cuanto pago
                        </label>
                        <input
                            type="number"
                            id="cashs"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}

                            className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-orange-300"
                            placeholder="$"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                            Comentarios
                        </label>
                        <textarea
                            type="text"
                            id="cashs"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}

                            className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-orange-300"
                            placeholder="¿Alguna especificacion?"
                        />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <h3 className="text-left font-bold  text-gray-700">Total:</h3>
                        <h3 className="text-right font-bold mb-6 text-gray-700">$20.000</h3>
                    </div>


                    <div className='flex flex-row justify-center'>
                        <ButtonComponent title={"Realizar pedido"}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DataDeliveryPage;
