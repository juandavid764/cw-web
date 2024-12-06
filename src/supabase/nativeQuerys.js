import { supabase } from "./client";

export async function getFormatRequest() {
  let { data, error } = await supabase.rpc("get_recent_requests");
  if (error) console.error(error);

  return data;
}
