import { supabase } from "./client";

// Obtenemos las requests en un intervalo de 2 dias
export async function getFormatRequest() {
  let { data, error } = await supabase.rpc("get_recent_requests");
  if (error) console.error(error);

  return data;
}

// Obtenemos las request de la fecha indicada
export async function getRequestsByDate(dateToConsult) {
  const { data, error } = await supabase.rpc('sum_total_by_date', { date_to_consult: dateToConsult });

  if (error) {
    console.error('Error al obtener la suma y el conteo:', error);
    return { totalSum: 0, totalCount: 0 }; // Retorna 0s en caso de error
  }

  const { total_sum, total_count } = data[0] || { total_sum: 0, total_count: 0 };

  console.log('Suma total:', total_sum);
  console.log('Cantidad de filas:', total_count);

  return { totalSum: total_sum, totalCount: total_count };
}

// Obtenemos la hora más activa de la fecha indicada
export async function getMostActiveHour(dateToConsult) {
  const { data, error } = await supabase.rpc('most_active_hour_by_date', { date_to_consult: dateToConsult });

  if (error) {
    console.error('Error al obtener la hora más activa:', error);
    return { hour: null, insertions: 0 }; // Retorna valores por defecto en caso de error
  }

  const { hour, insertions } = data[0] || { hour: null, insertions: 0 };

  console.log('Hora más activa:', hour);
  console.log('Total de inserciones en esa hora:', insertions);

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




