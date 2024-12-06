import { supabase } from "./client";

export async function deleteImage(imageUrl) {
  // Extract the path from the image URL
  const path = imageUrl.split("/").pop();

  const { error } = await supabase.storage.from("imgsProducts").remove([path]);

  if (error) {
    console.error("Error al eliminar la imagen:", error);
    return error;
  }

  return null;
}

//Sube la imagen al bucket y guarda la URL en la tabla Productos
export async function insertImage(file, productoId) {
  if (!file) {
    console.error("El archivo no es válido o no se ha proporcionado.");
    return null;
  }
  if (!productoId) {
    console.error("Cualejesa de que no hay productoid.");
    return null;
  }

  const filePath = `/${productoId}`;

  console.log("filePath", filePath);

  // Subir la imagen al bucket
  const { data, error } = await supabase.storage
    .from("imgsProducts")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error al subir imagen:", error);
    return null;
  }

  // Generar la URL pública o privada
  const { data: informacion, error: errorimagen } = supabase.storage
    .from("imgsProducts") // Nombre del bucket
    .getPublicUrl(filePath);

  if (errorimagen) {
    console.error("Error al obtener la url:", errorimagen);
    return null;
  }

  console.log("publicUrl", informacion.publicUrl);

  // Guardar la URL en la tabla Productos
  const { error: dbError } = await supabase
    .from("Product")
    .update({ imgUrl: informacion.publicUrl })
    .eq("product_id", productoId);

  if (dbError) {
    console.error("Error al guardar URL en Productos:", dbError);
  }
}

export async function getCurrentImageUrl(id) {
  if (!id) {
    console.error("Falta el ID del producto.");
    return null;
  }

  const { data, error } = await supabase
    .from("Product")
    .select("imgUrl")
    .eq("product_id", id)
    .single();

  if (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    return null;
  }

  return data ? data.imgUrl : null;
}
