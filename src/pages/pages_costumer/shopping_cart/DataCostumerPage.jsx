import React, { useState, useContext } from "react";
import ButtonComponent from "../../../components/web/ButtonComponent";
import { ProductsContext } from "../../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/utils";

const DataCostumerPage = () => {
  const { total, setClient } = useContext(ProductsContext);
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const client = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      formaPago: formData.formaPago,
      conCuantoPago:
        formData.formaPago === "Efectivo" ? formData.conCuantoPago : 0,
      comentarios: formData.comentarios,
    };

    setClient(client);

    navigate("/carrito/confirmPage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300 py-5">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Datos Cliente
        </h2>
        <div className="flex flex-row justify-between">
          <h3 className="text-left font-semibold text-gray-700">Subtotal:</h3>
          <h3 className="text-right font-semibold mb-6 text-gray-700">
            ${formatNumber(total)}
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
              required
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
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
              required
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="10"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Ingresa tu número de contacto"
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
                htmlFor="conCuantoPago"
              >
                Con cuánto pago
              </label>
              <input
                required
                type="number"
                min={total}
                id="conCuantoPago"
                name="conCuantoPago"
                value={formData.conCuantoPago}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
              placeholder="¿Alguna especificación?"
            />
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="text-left font-bold text-gray-700">Total:</h3>
            <h3 className="text-right font-bold mb-6 text-gray-700">
              ${formatNumber(total)}
            </h3>
          </div>

          <div className="flex flex-row justify-center">
            <ButtonComponent
              type="submit"
              title={"Realizar pedido"}
              onClickButton={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataCostumerPage;
