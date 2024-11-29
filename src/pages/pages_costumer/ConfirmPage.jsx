import React, { useEffect, useState, useContext } from "react";
import Footer from "../../components/web/Footer";
import { ProductsContext } from "../../context/ProductsContext";
import { insertRequest, insertOrder } from "../../supabase/crudFunctions";

const ConfirmPage = () => {
  const { cart, total } = useContext(ProductsContext);
  const [client, setClient] = useState(null);
  const [comanda, setComanda] = useState("");

  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    if (storedClient) {
      const clientFormatted = JSON.parse(storedClient);
      setClient(formatClient(clientFormatted));
    }

    const texto =  formatComanda()+client
    setComanda(texto);
    
    window.scrollTo(0, 0);
  }, [cart]);

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
    const { nombre, telefono, comentarios, conCuantoPago, formaPago } = client;
    return `
  - - - - - - - - - - - - -
  ${nombre}
  ${telefono}
  ${comentarios}
  ${formaPago === "Efectivo" ? conCuantoPago : "Transferencia"}
  `.trim();
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
    const insertedRequest = await insertRequest(client, total);
    if (insertedRequest.error) {
      alert("Error al insertar la solicitud");
      return;
    }

    const orderPromises = cart.map(async (order) => {
      const formattedSauces = formatSauces(order);
      const formattedAdditions = formatAdditions(order);
      return await insertOrder(
        order.product.id,
        formattedAdditions,
        formattedSauces,
        insertedRequest[0].request_id,
        order.quantity
      );
    });

    const ordersResponse = await Promise.all(orderPromises);
    if (ordersResponse.some((order) => order.error)) {
      alert("Error al insertar los pedidos");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      <main className="flex-grow flex flex-col items-center p-6">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-w-lg w-full p-6">
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
            Resumen de tu pedido
          </h2>
          <div className="bg-neutral-50 border border-gray-200 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre-wrap">
            {comanda}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">
              Total: <span className="text-xl font-bold text-orange-500">${total}</span>
            </p>
          </div>
          <button
            onClick={confirmButtonClicked}
            className="mt-6 w-full py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Confirmar pedido
          </button>
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4">
        <Footer />
      </footer>
    </div>
  );
};

export default ConfirmPage;
