import React, { useEffect, useState, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { insertRequest, insertOrder } from "../../supabase/crudFunctions";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/utils";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const { cart, total, client, setClient, setCart, setOrderCount } =
    useContext(ProductsContext);
  const [comanda, setComanda] = useState("");
  let nombreCliente = "";

  useEffect(() => {
    const generateComanda = () => {
      if (!client || cart.length === 0) return "";
      const formattedClient = formatClient(client);
      const texto = formatComanda() + formattedClient;
      return texto;
    };

    setComanda(generateComanda());
    window.scrollTo(0, 0);
  }, [client, cart]);

  const sendWhatsappMessage = (name, request_id, comanda) => {
    let textWpp = `Hola, soy ${name}.\n\n#${request_id}\n\n${comanda}`;

    let cellphone = "573006999492";

    // encoding the message text to be sent
    const textoCodificado = encodeURIComponent(textWpp);

    // creating the link
    const link = `https://wa.me/${cellphone}?text=${textoCodificado}`;

    // opening the link in a new tab
    window.open(link, "_blank");
  };

  const formatAdditions = (orderNow) => {
    let formattedAdditions = "";
    if (orderNow.additions && orderNow.additions.length > 0) {
      formattedAdditions = "Adics:\n ";
      formattedAdditions += orderNow.additions
        .map((addition) => `-${addition.quantity} ${addition.name} \n `)
        .join("");
    }
    return formattedAdditions;
  };

  const formatClient = (client) => {
    const {
      nombre,
      telefono,
      comentarios,
      conCuantoPago,
      formaPago,
      direccion,
      barrio,
    } = client;

    let res = "";
    res += `
    - - - - - - - - - - - - -
${nombre}
${telefono}
    `.trim();

    if (direccion) {
      res += `
${direccion}
${barrio}`;
    }

    if (comentarios != "") {
      res += `
"${comentarios}" `;
    }

    res += `
${
  formaPago === "Efectivo"
    ? "$" + formatNumber(conCuantoPago) + "/$" + formatNumber(total)
    : "Transferencia" + "/$" + formatNumber(total)
}`;

    return res;
  };

  const formatSauces = (orderNow) => {
    if (orderNow.sauces && orderNow.sauces.length > 0) {
      return `[${orderNow.sauces.join(", ")}]`;
    }
    return "[Sin salsas]";
  };

  const formatComanda = () => {
    return cart
      .map((order) => {
        const formattedSauces = formatSauces(order);
        const formattedAdditions = formatAdditions(order);
        return `*${order.quantity} ${order.product.name} \n\n ${formattedSauces} \n ${formattedAdditions} \n\n`;
      })
      .join("");
  };

  const confirmButtonClicked = async () => {
    nombreCliente = client.nombre;
    let formatted = formatClient(client);
    let conCuantoPago = client.conCuantoPago;
    const insertedRequest = await insertRequest(
      formatted,
      total,
      conCuantoPago
    );
    if (insertedRequest.error) {
      alert("Error al insertar la solicitud");
      return;
    }

    const orderPromises = cart.map(async (order) => {
      const formattedSauces = formatSauces(order);
      const formattedAdditions = formatAdditions(order);

      return await insertOrder({
        product_id: order.product.id,
        additions: formattedAdditions,
        sauces: formattedSauces,
        request: insertedRequest[0].request_id,
        quantity: order.quantity,
      });
    });

    const ordersResponse = await Promise.all(orderPromises);
    if (ordersResponse.some((order) => order.error)) {
      alert("Error al insertar los pedidos");
    }

    sendWhatsappMessage(nombreCliente, insertedRequest[0].request_id, comanda);
    setCart([]);
    setClient(null);
    setOrderCount(0);
    navigate("/rastrearPedido");
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow flex flex-col items-center p-6">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-w-lg w-full p-6">
          <h2 className="text-center text-xl font-bold text-gray-700 mb-4">
            Resumen de tu pedido
          </h2>
          <div className="bg-neutral-50 border border-gray-200 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre-wrap">
            {comanda}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">
              Total:{" "}
              <span className="text-xl font-bold text-orange-500">
                ${formatNumber(total)}
              </span>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={confirmButtonClicked}
              className="w-full py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center"
            >
              <WhatsAppIcon className="mr-2" />
              Confirmar pedido
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmPage;
