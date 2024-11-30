import React, { useState, useContext, useEffect } from "react";
import ButtonComponent from "../../../components/web/ButtonComponent";
import { ProductsContext } from "../../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { getNeighborhoods } from "../../../supabase/crudFunctions";

const DataDeliveryPage = () => {
  const { total, setTotal } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [neighborhoods, setNeighborhoods] = useState();
  const [deliveryValue, setDeliveryValue] = useState(0);
  const [phone, setPhone] = useState(0);
  const [subTotal, setSubTotal] = useState(total - deliveryValue);
  

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value); // Obtiene el valor actual del select
  };

  const handleTotalChange = (event) => {
    //Convierte el valor del select a un 
    setDeliveryValue(parseInt(event.target.value));

    setTotal(deliveryValue+subTotal); // Obtiene el valor actual del select
    console.log(total);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    navigate("/carrito/confirmPage");
  };

  useEffect(() => {
    getNeighborhoods().then(result => {
      setNeighborhoods(result);
      setDeliveryValue(result[0].delivery_price);
    });
  }, [total]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Datos Domicilio
        </h2>
        <div className="flex flex-row justify-between">
          <h3 className="text-left font-semibold  text-gray-700">Subtotal:</h3>
          <h3 className="text-right font-semibold mb-6 text-gray-700">
            ${ subTotal}
          </h3>
        </div>

        {/*  */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Nombre
            </label>
            <input
            required={true}
              type="text"
              id="nombre"

              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
              placeholder="¿Quién recibe el pedido?"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="neighborhoods"
              className="block text-gray-700 font-semibold mb-2"
            >
              Barrio:
            </label>
            <select
            onClick={handleTotalChange}
            onChange={handleTotalChange}

              id="neighborhoods"
              name="cars"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-300 focus:border-gray-500 sm:text-sm rounded-md"
            >
            {/* <option key={0} value={0}>{"Selecciona tu barrio"}</option> */}
            {neighborhoods && neighborhoods.map((neighborhood) => (
              
              <option key={neighborhood.neighborhood_id} value={neighborhood.
delivery_price}>{neighborhood.name}</option>
            ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Dirección
            </label>
            <input
            required
              type="text"
              id="ddress"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
              placeholder="Calle 51 # 40c-03"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Teléfono
            </label>
            <input
            required
              type="number"
              id="phone"
              minLength={10}
              maxLength={10}
              onChange={telefono => {
              if (telefono.target.value.length > 10) {
                telefono.target.value = telefono.target.value.slice(0, 10)

              }}}
              
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}

              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
              placeholder="3165684544"
            />

          </div>
          <div className="mb-4">
            <label
              htmlFor="payment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Forma de pago:
            </label>
            <select
              id="payment"
              name="cars"
              onClick={handlePaymentChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-300 focus:border-gray-500 sm:text-sm rounded-md"
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          {paymentMethod === "Efectivo" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="cashs"
              >
                Con cuanto pago
              </label>
              <input
              required
                type="number"
                id="cashs"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="$"
                min={total}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Comentarios <span className="font-extralight">opcional</span>
            </label> 
            <textarea
              type="text"
              id="cashs"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
              placeholder="¿Alguna especificacion?"
            />
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="text-left font-bold  text-gray-700">Total:</h3>
            <h3 className="text-right font-bold mb-6 text-gray-700">
              {total}
            </h3>
          </div>
          <div className="flex flex-row justify-center">  
              <ButtonComponent title={"Realizar pedido"} onClickButton={()=>{}} type="submit" />
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default DataDeliveryPage;
