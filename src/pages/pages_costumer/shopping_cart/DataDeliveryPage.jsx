import React, { useState, useContext, useEffect } from "react";
import ButtonComponent from "../../../components/web/ButtonComponent";
import { ProductsContext } from "../../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { getNeighborhoods } from "../../../supabase/crudFunctions";

const DataDeliveryPage = () => {
  const { total, setTotal, setClient } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [subtotal, setSubtotal] = useState(total); // Nuevo estado para manejar el subtotal
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    barrio: "",
    formaPago: "Efectivo",
    conCuantoPago: "",
    comentarios: "",
    deliveryValue: 0,
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el cambio de barrio y actualiza el total con base en el subtotal
  const handleNeighborhoodChange = (event) => {
    const deliveryPrice = parseInt(event.target.value);
    const selectedNeighborhood = neighborhoods.find(
      (n) => n.delivery_price === deliveryPrice
    );

    setFormData({
      ...formData,
      barrio: selectedNeighborhood?.name || "",
      deliveryValue: deliveryPrice,
    });

    // Actualiza el total basado en el subtotal y el nuevo costo de envío
    setTotal(subtotal + deliveryPrice);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const clientData = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      direccion: formData.direccion,
      barrio: formData.barrio,
      formaPago: formData.formaPago,
      conCuantoPago:
        formData.formaPago === "Efectivo" ? formData.conCuantoPago : "",
      comentarios: formData.comentarios,
      total: total,
    };

    setClient(clientData);
    navigate("/carrito/confirmPage");
  };

  useEffect(() => {
    getNeighborhoods().then((result) => {
      setNeighborhoods(result);
      const initialDeliveryPrice = result[0]?.delivery_price || 0;

      // Inicializa el barrio y actualiza el total
      setFormData((prev) => ({
        ...prev,
        deliveryValue: initialDeliveryPrice,
        barrio: result[0]?.name || "",
      }));
      setTotal(subtotal + initialDeliveryPrice);
    });
  }, [subtotal]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300 py-5">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Datos Domicilio
        </h2>
        <div className="flex flex-row justify-between">
          <h3 className="text-left font-semibold text-gray-700">Subtotal:</h3>
          <h3 className="text-right font-semibold mb-6 text-gray-700">
            ${subtotal}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre
            </label>
            <input
              required
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="¿Quién recibe el pedido?"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Barrio:
            </label>
            <select
              name="barrio"
              value={formData.deliveryValue}
              onChange={handleNeighborhoodChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
            >
              {neighborhoods.map((neighborhood) => (
                <option
                  key={neighborhood.neighborhood_id}
                  value={neighborhood.delivery_price}
                >
                  {neighborhood.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Dirección:
            </label>
            <input
              required
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Ingrese la dirección de entrega"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Teléfono:
            </label>
            <input
              required
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="10"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Ingrese su número de teléfono"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Forma de pago:
            </label>
            <select
              name="formaPago"
              value={formData.formaPago}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          {formData.formaPago === "Efectivo" && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Con cuánto pagas?
              </label>
              <input
                required
                type="number"
                name="conCuantoPago"
                value={formData.conCuantoPago}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="$"
                min={total}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Comentarios <span className="font-extralight">(opcional)</span>
            </label>
            <textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="¿Alguna especificación?"
            />
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="text-left font-bold text-gray-700">Total:</h3>
            <h3 className="text-right font-bold mb-6 text-gray-700">
              ${total}
            </h3>
          </div>
          <div className="flex flex-row justify-center">
            <ButtonComponent
              title={"Realizar pedido"}
              type="submit"
              onClickButton={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataDeliveryPage;
