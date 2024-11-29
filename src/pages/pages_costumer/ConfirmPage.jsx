import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Footer from "../../components/web/Footer";
import { useEffect, useState, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { insertRequest, insertOrder } from "../../supabase/crudFunctions";
import Comanda from "../../components/web/Comanda";

const ConfirmPage = () => {
  const { cart, total } = useContext(ProductsContext);
  const [client, setClient] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedClient = localStorage.getItem("client");
    console.log("Stored client:", storedClient);
    if (storedClient) {
      setClient(JSON.parse(storedClient));
    }
  }, []);

  if (!client) {
    return <p>Error: No hay datos del cliente.</p>;
  }

  let telefono = client.telefono;
  let formattedComanda = "";

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

  const formattedClient = formatClient(client);

  console.log(formattedClient);
  console.log("Carrito:", cart);

  const handleClick = async () => {
    const insertedRequest = await insertRequest(formattedClient, total);
    console.log("Request response:", insertedRequest);

    if (insertedRequest.error) {
      alert("Error al insertar la solicitud");
      return;
    }

    const orderPromises = cart.map(async (order) => {
      //les doy el formato de la comanda a las adiciones
      let formattedAdditions = "";
      if (order.additions && order.additions.length > 0) {
        formattedAdditions = "Adics:\n ";
        formattedAdditions += order.additions
          .map((addition) => {
            return `-${addition.quantity} ${addition.name} \n `;
          })
          .join(""); // Unir los elementos del array en una sola cadena sin comas
      }

      let formattedSauces = "";
      if (order.sauces && order.sauces.length > 0) {
        formattedSauces += `[${order.sauces.join(", ")}]`;
      } else {
        formattedSauces = "[Sin salsas]";
      }

      formattedComanda += `*${order.quantity} ${order.product.name} \n \n ${formattedSauces} \n ${formattedAdditions} \n \n`;

      console.log(formattedComanda);
      const orderResponse = await insertOrder(
        order.product.id,
        formattedAdditions,
        formattedSauces,
        insertedRequest[0].request_id,
        order.quantity
      );
      return orderResponse;
    });

    const ordersResponse = await Promise.all(orderPromises);
    console.log("Orders response:", ordersResponse);

    if (ordersResponse.some((order) => order.error)) {
      alert("Error al insertar los pedidos");
      return;
    }
    formattedComanda += `${formattedClient}`;
    console.log(formattedComanda);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <div className="flex-grow flex flex-col justify-center items-center lg:mt-10">
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: { xs: "8px", sm: "16px" },
            maxWidth: "600px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Información de mi pedido
            </h2>
            <div className="flex flex-row justify-center items-center gap-5">
              <h2 className="text-lg lg:text-2xl font-bold">#123232</h2>
              <Chip
                label={"Pendiente"}
                variant="filled"
                size="medium"
                color="error"
                className="my-4"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <p className="text-lg lg:text-2xl"></p>
              <Comanda></Comanda>
            </div>

            <div>
              <Button
                onClick={handleClick}
                startIcon={<WhatsAppIcon />}
                variant="contained"
                //sx={{ textTransform: 'none', backgroundColor: '#BF9000', '&:hover': { backgroundColor: '#A67C00' } }}
                color="warning"
                className="mt-4 bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
                fullWidth
              >
                Confirmar pedido
              </Button>
            </div>
          </div>
        </Box>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default ConfirmPage;
