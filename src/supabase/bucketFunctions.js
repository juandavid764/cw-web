import { supabase } from "./client";

export async function deleteImage(path) {
  const { error } = await supabase.storage.from("imgsProducts").remove([path]);

  if (error) {
    console.error("Error al eliminar la imagen:", error);
    return error;
  }

  return null;
}

export async function insertImage(file, productoId) {
  if (!file) {
    console.error("El archivo no es válido o no se ha proporcionado.");
    return null;
  }

  if (!productoId) {
    console.error("Falta el productId.");
    return null;
  }

  const filePath = `${productoId}`; // Ruta única basada en el producto
  let img = null;
  img = await getCurrentImageUrl(productoId);
  if (img) {
    await deleteImage(filePath);
  }

  try {
    // Subir o sobrescribir la imagen al bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("imgsProducts")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Error al subir imagen:", uploadError);
      return null;
    }

    console.log("Imagen subida correctamente:", uploadData);

    // Obtener la URL pública
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("imgsProducts")
      .getPublicUrl(filePath);

    if (publicUrlError) {
      console.error("Error al obtener la URL pública:", publicUrlError);
      return null;
    }

    const publicUrl = publicUrlData.publicUrl;
    console.log("URL pública generada:", publicUrl);

    // Guardar la URL pública en la tabla Productos
    const { error: dbError } = await supabase
      .from("Product")
      .update({ imgUrl: publicUrl })
      .eq("product_id", productoId);

    if (dbError) {
      console.error("Error al guardar la URL en la tabla Productos:", dbError);
      return null;
    }

    console.log("URL guardada correctamente en la tabla Productos.");
    return publicUrl; // Retornar la URL en caso de éxito
  } catch (err) {
    console.error("Error inesperado:", err);
    return null;
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
