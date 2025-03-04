import { useEffect } from "react";
import { supabase } from "./client.js";

export const useSubscribeToRouteChanges = (handleRouteChanged) => {
      // Suscripción a cambios en tiempo real
      useEffect(() => {
        const requestChannel = supabase
          .channel("RoutePage")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "Route" },
            () => {
                handleRouteChanged()
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(requestChannel); // Limpiar suscripción al desmontar
        };
      }, []);
    
};
