import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function CardSkeleton() {
  return (
    <div
      style={{
        width: "20rem", // Equivalente a `max-w-xs` de Tailwind
        height: "25rem", // Equivalente a `h-[400px]` de Tailwind
        backgroundColor: "white",
        borderRadius: "0.75rem", // Equivalente a `rounded-xl`
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Equivalente a `shadow-md`
        padding: "1rem", // Equivalente a `p-4`
      }}
    >
      <Stack spacing={2}>
        {/* Imagen del producto */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "12rem", // Equivalente a `h-48` de Tailwind
            borderRadius: "0.5rem", // Equivalente a `rounded-md`
          }}
        />
        <div style={{ padding: "1rem" }}>
          {/* Título del producto */}
          <Skeleton
            variant="text"
            sx={{
              fontSize: "1.25rem", // Equivalente a `text-2xl`
              height: "1.5rem", // Equivalente a `h-6`
              width: "75%", // Equivalente a `w-3/4`
              marginBottom: "0.5rem", // Espaciado entre elementos
            }}
          />
          {/* Descripción */}
          <Skeleton
            variant="text"
            sx={{
              fontSize: "1rem",
              height: "1rem", // Equivalente a `h-4`
              width: "100%", // Equivalente a `w-full`
              marginBottom: "0.25rem",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "1rem",
              height: "1rem", // Equivalente a `h-4`
              width: "85%", // Equivalente a `w-5/6`
              marginBottom: "1rem",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Precio */}
            <Skeleton
              variant="text"
              sx={{
                fontSize: "1.125rem", // Equivalente a `text-lg`
                height: "1.5rem", // Equivalente a `h-6`
                width: "25%", // Equivalente a `w-1/4`
              }}
            />
            {/* Botón */}
            <Skeleton
              variant="circular"
              sx={{
                width: "2.5rem", // Equivalente a `h-10`
                height: "2.5rem", // Equivalente a `w-10`
              }}
            />
          </div>
        </div>
      </Stack>
    </div>
  );
}
