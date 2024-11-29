import React, { useState, useContext } from "react";
import ButtonComponent from "../../../components/web/ButtonComponent";
import { ProductsContext } from "../../../context/ProductsContext";
import { Link } from "react-router-dom";

const DataCostumerPage = () => {
  const { total } = useContext(ProductsContext);
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

  // Estado para capturar los valores del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    formaPago: "Efectivo",
    conCuantoPago: "",
    comentarios: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (event) => {
    const value = event.target.value;
    setPaymentMethod(value);
    setFormData({
      ...formData,
      formaPago: value,
    });
  };

  const handleSubmit = () => {
    const client = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      formaPago: formData.formaPago,
      conCuantoPago:
        formData.formaPago === "Efectivo" ? formData.conCuantoPago : 0,
      comentarios: formData.comentarios,
    };

    localStorage.setItem("client", JSON.stringify(client));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-orange-300">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Datos Cliente
        </h2>
        <div className="flex flex-row justify-between">
          <h3 className="text-left font-semibold text-gray-700">Subtotal:</h3>
          <h3 className="text-right font-semibold mb-6 text-gray-700">
            ${total.toLocaleString()}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-300"
              placeholder="¿Quién recibe el pedido?"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-300"
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
              name="formaPago"
              value={formData.formaPago}
              onChange={handlePaymentChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-300 focus:border-orange-500 sm:text-sm rounded-md"
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>

          {paymentMethod === "Efectivo" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="conCuantoPago"
              >
                Con cuánto pago
              </label>
              <input
                type="number"
                id="conCuantoPago"
                name="conCuantoPago"
                value={formData.conCuantoPago}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-300"
                placeholder="$"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="comentarios"
            >
              Comentarios
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-300"
              placeholder="¿Alguna especificación?"
            />
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="text-left font-bold text-gray-700">Total:</h3>
            <h3 className="text-right font-bold mb-6 text-gray-700">
              ${total.toLocaleString()}
            </h3>
          </div>

          <div className="flex flex-row justify-center">
            <Link to={"/carrito/confirmPage"}>
              <ButtonComponent
                title={"Realizar pedido"}
                onClickButton={handleSubmit}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataCostumerPage;
