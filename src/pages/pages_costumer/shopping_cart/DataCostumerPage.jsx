import { useState, useContext } from "react";
import ButtonComponent from "../../../components/web/ButtonComponent";
import { ProductsContext } from "../../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { addThousandSeparators } from "../../../utils/addThousandSeparators.js";

const DataCostumerPage = () => {
  // Estados para mostrar mensajes de error
  const [feedbackTel, setFeedbackTel] = useState(false);
  const [feedbackPago, setFeedbackPago] = useState(false);

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

    //Se define validaciones para los inputs o logica especifica
    switch (name) {
      case "telefono":
  
        // No permitir más de 10 caracteres
        if (value.length > 10) return;
  
        // Si el número es menor a 10 caracteres, mostrar feedback
        if (value.length < 10) {
          if (!feedbackTel) setFeedbackTel(true);
        } else {
          if (feedbackTel) setFeedbackTel(false);
        }
  
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      case "conCuantoPago":
        //Le quitamos los punto y "$" al texto
        let onlyNumber = value.replace(/[$.]/g, "");

        //No permite insertar letras o mas de 7 digitos
        if (isNaN(onlyNumber) || onlyNumber.length > 7) {
          return;
        } else {
          if (onlyNumber < total) {
            //Cambia a TRUE solo si estaba FALSE (Evita rendirizados adicionales)
            if (!feedbackPago) {
              setFeedbackPago(true);
            }
          } else {
            //Quita el mensaje de error cuando la cantidad es correcta
            if (feedbackPago) {
              setFeedbackPago(false);
            }
          }
        }

        setFormData({
          ...formData,
          [name]: onlyNumber,
        });
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
    }
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

    //valida que no haya ningun feedback activo
    if (feedbackTel || feedbackPago) {
      return;
    }

    if (formData.conCuantoPago === "") {
      setFeedbackPago(true);
      return;
    } else {
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300 py-5">
      <div className="bg-slate-50 p-8 rounded-lg shadow-lg w-full max-w-md border-2">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Datos Cliente
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
              Teléfono<span className="text-red-500 align-middle">*</span>
            </label>
            <input
              min={0}
              required
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="10"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="Ingresa tu número de contacto"
            />
            {feedbackTel && (
              <p className="text-red-500 text-xs italic">
                Debes digitar 10 dígitos
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="payment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Forma de pago:<span className="text-red-500 align-middle">*</span>
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
                <span className="text-red-500 align-middle">*</span>
              </label>
              <input
                required
                type="text"
                id="conCuantoPago"
                name="conCuantoPago"
                value={"$" + addThousandSeparators(formData.conCuantoPago)}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-gray-400"
                placeholder="$"
              />
              {feedbackPago && (
                <p className="text-red-500 text-xs italic">
                  El valor minimo a pagar es *{addThousandSeparators(total)}*
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="comentarios"
            >
              Comentarios<span className="font-extralight">(opcional)</span>
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
              ${addThousandSeparators(total)}
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
