import { supabase } from "./client";

export async function deleteImage(imageUrl) {
    // Extract the path from the image URL
    const path = imageUrl.split('/').pop();

    const { error } = await supabase
        .storage
        .from('imgsProducts')
        .remove([path]);

    if (error) {
        console.error('Error al eliminar la imagen:', error);
        return error;
    }

    return null;
}

//Sube la imagen al bucket y guarda la URL en la tabla Productos
export async function insertImage(file, productoId) {
    const filePath = `/${productoId}/${file.name}`;

    // Subir la imagen al bucket
    const { data, error } = await supabase.storage
        .from('imgsProducts')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        });


    if (error) {
        console.error('Error al subir imagen:', error);
        return null;
    }

    // Generar la URL pública o privada
    const { publicUrl } = supabase.storage.from('imgsProducts').getPublicUrl(filePath);

    // Guardar la URL en la tabla Productos
    const { error: dbError } = await supabase
        .from('Productos')
        .update({ imagen_url: publicUrl })
        .eq('id', productoId);

    if (dbError) {
        console.error('Error al guardar URL en Productos:', dbError);
    }

    return publicUrl;
}


// Obtener la URL de la imagen actual
export async function getCurrentImageUrl(id) {
    const { data: currentUrl, error: currentError } = await supabase
        .from('Productos')
        .select('imagen_url')
        .eq('id', id)
        .single();

    if (currentError) {
        console.error('Error al obtener la url actual:', currentError);
        return null;
    }

    return currentUrl.imagen_url;
}