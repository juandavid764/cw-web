import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { orange } from "@mui/material/colors";
import { getRequestDetails } from "../../supabase/crudFunctions";

export default function CustomizedInputBase({ setOrderDetails, setError }) {
  const [orderId, setOrderId] = useState("");

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError("Por favor, ingresa un ID válido.");
      setOrderDetails(null);
      return;
    }

    try {
      setError(null);
      const result = await getRequestDetails(orderId); // Consulta los detalles del pedido
      if (!result) {
        setOrderDetails(null);
        setError("No se encontró un pedido con este ID.");
      } else {
        setOrderDetails(result); // Almacena los detalles del pedido
        setError(null);
      }
    } catch (err) {
      setError("Ocurrió un error al buscar el pedido.");
      setOrderDetails(null);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Digita el # de tu pedido"
          inputProps={{ "aria-label": "buscar pedido" }}
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <IconButton
          type="button"
          onClick={handleSearch}
          sx={{ p: "10px", color: orange[300] }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
