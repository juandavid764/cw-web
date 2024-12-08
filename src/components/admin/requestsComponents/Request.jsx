/* eslint-disable react/prop-types */
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Request({ pedido, handleRequestSelection, selectedPedido }) {
  function getStatusColor(status) {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-400";
      case "En proceso":
        return "bg-blue-400";
      case "Completado":
        return "bg-green-400";
      case "Cancelado":
        return "bg-red-400";
      default:
        return "bg-gray-100";
    }
  }

  function formatPedidoContent(pedido) {
    // Formatear los productos, eliminando etiquetas innecesarias y saltos de línea
    let formattedProducts = pedido.formatted_products
      .replace(/\\n/g, "\n") // Reemplaza los caracteres \n por saltos de línea reales
      .replace(/\[\[.*?\]\]/g, "") // Elimina las etiquetas [[...]]
      .trim(); // Elimina los espacios extra al inicio y final

    // Asegurarse de que la palabra "Adics:" sólo aparezca una vez
    formattedProducts = formattedProducts.replace(/Adics:/g, "Adics:");

    // Si hay adiciones, agregarlas al final
    if (pedido.additions && pedido.additions.length > 0) {
      formattedProducts += "\nAdics:\n";
      formattedProducts += pedido.additions
        .map((addition) => `- ${addition.quantity} ${addition.name}`)
        .join("\n");
    }

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
  
  ${products}
  
  ${pedido.client.replace(/\\n/g, "\n").trim()}
  total: ${pedido.total}
  `;
  }

  // Función para copiar al portapapeles
  function copyToClipboard() {
    const content = formatPedidoContent(pedido);
    navigator.clipboard
      .writeText(content)
      .then(() => alert("¡Contenido copiado al portapapeles!"))
      .catch((err) => alert("Hubo un error al copiar el contenido."));
  }

  return (
    <div
      onClick={() => handleRequestSelection(pedido)}
      className={`border rounded-md cursor-pointer transition-colors flex items-center justify-around py-3 px- w-80 ${
        selectedPedido?.request_id === pedido.request_id
          ? "border-orange-400"
          : "border-gray-300"
      } ${getStatusColor(pedido.status)}`}
    >
      <div className="flex flex-col items-center justify-center">
        <p>
          <strong>#{pedido.request_id}</strong>
        </p>
        <div>
          <p>
            <strong>Hora:</strong> {pedido.time.split(".")[0]}
          </p>
        </div>
      </div>
      <div className="flex align-top text-xl">
        <p>
          <strong>{pedido.status.toUpperCase()}</strong>
        </p>
      </div>
      <div>
        {/* Botón para copiar al portapapeles */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el evento haga clic en el contenedor principal
            copyToClipboard();
          }}
          className="p-2 bg-transparent rounded hover:scale-150 scale-125"
        >
          <FontAwesomeIcon icon={faCopy} className="text-white-800 font-bold" />
        </button>
      </div>
    </div>
  );
}
