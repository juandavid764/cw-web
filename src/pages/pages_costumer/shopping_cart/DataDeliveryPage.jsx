import { useState, useContext, useEffect } from "react";
import ButtonComponent from "../../../components/web/ButtonComponent";
import { ProductsContext } from "../../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { getNeighborhoods } from "../../../supabase/crudFunctions";
import { formatNumber } from "../../../utils/utils";

const DataDeliveryPage = () => {
  const { total, setTotal, setClient } = useContext(ProductsContext);
  const navigate = useNavigate();

  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loadingNei, setLoadingNei] = useState(true);

  const [feedbackTel, setFeedbackTel] = useState(false);
  const [feedbackPago, setFeedbackPago] = useState(false);

  const [subtotal, setSubtotal] = useState(total); // Nuevo estado para manejar el subtotal

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    formaPago: "Efectivo",
    conCuantoPago: "0",
    comentarios: "",
    deliveryValue: 0,
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "telefono":
        // Si el número de teléfono es mayor a 10 caracteres, se muestra un mensaje de error
        if (value.length > 10) {
          setFeedbackTel(true);
          return;
        }
        // Si el número de teléfono es correcto, se oculta el mensaje de error y se actualiza el estado
        else {
          setFeedbackTel(false);

          value.toString();
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case "conCuantoPago":
        if (isNaN(value)) {
          setFeedbackPago(true);
          return;
        } else {
          setFeedbackPago(false);
        }
   
        setFormData({
          ...formData,
          [name]: value,
        })
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
    }
  };

  const handleSubmit = (event) => {
    if (formData.telefono.length === 10) {
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
    } else {
      setFeedbackTel(true);
    }
  };

  // Obtiene los barrios al cargar la página
  useEffect(() => {
    getNeighborhoods()
      .then((data) => {
        setNeighborhoods(data);
        setLoadingNei(false);
      })
      .catch((error) => {
        console.error("Error al obtener los barrios", error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300 py-5">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Datos Domicilio
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nombre"
            >
              Nombre<span className="text-red-500 align-middle">*</span>
            </label>
            <input
              id="nombre"
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
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="deliveryValue"
            >
              Barrio<span className="text-red-500 align-middle">*</span>
            </label>
            <select
              id="deliveryValue"
              name="deliveryValue"
              defaultValue={"seleciona un barrio"}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              required
            >
              <option defaultChecked value="">Seleccione un barrio</option>
              {neighborhoods.map((neighborhood) => (
                <option
                  key={neighborhood.neighborhood_id}
                  value={neighborhood.delivery_price}
                >
                  {neighborhood.name}
                </option>
              ))}
            </select>
            {loadingNei && <p className="text-gray-500">Cargando barrios...</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="direccion"
            >
              Dirección<span className="text-red-500 align-middle">*</span>
            </label>
            <input
              id="direccion"
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
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="telefono"
            >
              Teléfono<span className="text-red-500 align-middle">*</span>
            </label>
            <input
              id="telefono"
              required
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="10"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Ingrese su número de teléfono"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
                margin: 0,
              }}
            />
            {feedbackTel && (
              <p className="text-red-500 text-xs italic">
                El número de teléfono dene tener de 10 dígitos
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="formaPago"
            >
              Forma de pago<span className="text-red-500 align-middle">*</span>
            </label>
            <select
              id="formaPago"
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
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="conCuantoPago"
              >
                ¿Con cuánto pagas?
                <span className="text-red-500 align-middle">*</span>
              </label>
              <input
                id="conCuantoPago"
                required
                type="text"
                name="conCuantoPago"
                value={formData.conCuantoPago}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="$"
              />
              {feedbackPago && (
                <p className="text-red-500 text-xs italic">
                  El valor minimo a pagar es *{formatNumber(total)}*
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="comentarios"
            >
              Comentarios <span className="font-extralight">(opcional)</span>
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="¿Alguna especificación?"
            />
          </div>
          <div className="flex flex-col justify-stretch gap-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-left font-semibold text-gray-700">
                Subtotal:
              </h3>
              <h3 className="text-right font-semibold mb-6 text-gray-700">
                {formatNumber(subtotal)}
              </h3>
            </div>
            <div className="flex flex-row justify-between">
              <h3 className="text-left font-semibold text-gray-700">
                Valor Domicilio:
              </h3>
              <h3 className="text-right font-semibold mb-6 text-gray-700">
                {formatNumber(formData.deliveryValue)}
              </h3>
            </div>
            <div className="flex flex-row justify-between">
              <h3 className="text-left font-bold text-gray-700">Total:</h3>
              <h3 className="text-right font-bold mb-6 text-gray-700">
                {formatNumber(total)}
              </h3>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <ButtonComponent
              title={"Realizar pedido"}
              type="submit"
              onClickButton={() => { }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataDeliveryPage;
