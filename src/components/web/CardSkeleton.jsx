import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function CardSkeleton() {
  return (
    <div className="w-[280px] h-[400px] bg-white rounded-xl shadow-md p-4">
      <Stack>
        {/* Imagen del producto */}
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "180px" }}
        />
        <div className="p-4">
          {/* Título del producto */}
          <Skeleton variant="text" className="text-2xl h-6 w-3/4 mt-1" />
          {/* Descripción */}
          <Skeleton variant="text" className="text-base h-4 w-full mt-1" />
          <Skeleton variant="text" className="text-base h-4 w-5/6 mt-1" />
          <div className="flex justify-between items-center">
            {/* Precio */}
            <Skeleton variant="text" className="text-lg h-6 w-1/4 mt-1" />
            {/* Botón */}
            <Skeleton variant="circular" className="h-10 w-10" />
          </div>
        </div>
      </Stack>
    </div>
  );
}
