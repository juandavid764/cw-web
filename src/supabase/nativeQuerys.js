import { supabase } from "./client";

// Obtenemos las requests en un intervalo de 2 dias
export async function getFormatRequest() {
  let { data, error } = await supabase.rpc("get_recent_requests");
  if (error) console.error(error);

  return data;
}

// Obtenemos las request de la fecha indicada
export async function getNetSalesByDate(dateToConsult) {
  const { data, error } = await supabase.rpc('net_sales_by_date', { date_to_consult: dateToConsult });

  if (error) {
    console.error('Error al obtener la suma y el conteo:', error);
    return { ventas_netas: 0, totalCount: 0 }; // Retorna 0s en caso de error
  }

  const { ventas_netas, cant_clientes } = data[0] || { total_sum: 0, total_count: 0 };

  console.log(`Ventas netas: ${ventas_netas}`);
  console.log(`Cantidad clientes: ${cant_clientes}`);

  return { ventas_netas, cant_clientes };
}

// Obtenemos la hora más activa de la fecha indicada
export async function getMostActiveHour(dateToConsult) {
  const { data, error } = await supabase.rpc('most_active_hour_by_date', { date_to_consult: dateToConsult });

  if (error) {
    console.error('Error al obtener la hora más activa:', error);
    return { hour: null, insertions: 0 }; // Retorna valores por defecto en caso de error
  }

  const { hour, insertions } = data[0] || { hour: null, insertions: 0 };

  console.log('Hora pico:', hour);
  console.log('Cantidad de ventas en hora pico:', insertions);

  return { hour, insertions };
}

// Obtenemos los productos vendidos en la fecha indicada
export async function getProductsSold(dateToConsult) {
  const { data, error } = await supabase.rpc('get_products_sold_by_date', { date_to_consult: dateToConsult });

  if (error) {
    console.error('Error fetching products sold:', error);
    return [];
  }

  console.log('Products sold:', data);
  return data; // Devuelve los productos y la cantidad vendida
}




