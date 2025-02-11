/* eslint-disable react/prop-types */
import { faClock, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export function Request({ pedido, handleRequestSelection, selectedPedido }) {
  function getStatusColor(status) {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-200";
      case "En proceso":
        return "bg-blue-200";
      case "Completado":
        return "bg-green-200";
      case "Cancelado":
        return "bg-red-200";
      default:
        return "bg-gray-100";
    }
  }

  function formatPedidoContent(pedido) {
    console.log("Pedido:", pedido);
    // Formatear los productos, eliminando etiquetas innecesarias y saltos de líneas
    let formattedProducts = pedido.formatted_products
      .replace(/\\nAdics:\\n/g, " ")
      .replace(/- Adics/g, " \n \n Adics ")
      .replace(/- /g, " \n ")
      .replace(/\[\[/g, "[")
      .replace(/\]\]/g, "]");
    formattedProducts = formattedProducts.replace(/\\n/g, " \n ");
    console.log("Productos:", formattedProducts);

    // Organizar los productos para que cada uno tenga el formato correcto
    let products = formattedProducts.split("\n*");

    // Limpiar los productos y agregar los saltos de línea correctos
    products = products
      .map((product, index) => {
        // Eliminar saltos de línea adicionales y asegurarse de que todos los productos empiecen con "*"
        product = product.trim().replace(/^\*/g, "*"); // Asegura que cada producto empiece con "*"
        if (index > 0) product = `*${product}`; // Volver a agregar '*' en los productos
        return product;
      })
      .join("\n\n"); // Unir los productos con saltos de línea entre ellos

    // Devolver el contenido final con el formato esperado
    return `
  #${pedido.request_id}
  
  ${formattedProducts}
  
  ${pedido.client.replace(/\\n/g, "\n").trim()}
  total: ${pedido.total}
  `;
  }

  // Función para copiar al portapapeles
  function copyToClipboard() {
    const content = formatPedidoContent(pedido);
    navigator.clipboard
      .writeText(content)
      .then(() => {toast("✅ Copiado al portapapeles", {})})
      .catch((err) => alert("Hubo un error al copiar el contenido."));
  }

  return (
    <div
      onClick={() => handleRequestSelection(pedido)}
      className={`px-4 cursor-pointer rounded-lg  transition-colors flex items-center justify-around py-3 w-80 ${
        selectedPedido?.request_id === pedido.request_id
          ? "ring-1 ring-gray-500 shadow-md"
          : "shadow-md"
      } ${getStatusColor(pedido.status)}`}
    >
      <div className="flex flex-col items-center justify-center grow">
        <div className="flex justify-around w-full">
          <p className="text-left">
            <strong>#{pedido.request_id}</strong>
          </p>
          <p className="grow">&nbsp;&nbsp;{pedido.status}</p>
        </div>
        <div className="flex w-full">
          <p>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            &nbsp;&nbsp;{pedido.time.split(".")[0]}
          </p>
        </div>
      </div>
      <div>
        {/* Botón para copiar al portapapeles */}
        <button
          onClick={(e) => {
            //e.stopPropagation(); // Evita que el evento haga clic en el contenedor principal
            copyToClipboard();
          }}
          
          className="p-2 bg-transparent rounded active:scale-90 transition-transform"
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
    </div>
  );
}
