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

  // Función para formatear el contenido del pedido
  function formatPedidoContent(pedido) {
    const formattedProducts = pedido.formatted_products
      .replace(/\\n/g, "\n") // Reemplaza los caracteres \n
      .replace(/\[\[.*?\]\]/g, "") // Elimina las etiquetas [[...]]
      .replace(/Adics:/g, "Adics:\n"); // Asegura saltos de línea en adiciones

    return `
#${pedido.request_id}

${formattedProducts.trim()}

- - - - - - - - - - - - -
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