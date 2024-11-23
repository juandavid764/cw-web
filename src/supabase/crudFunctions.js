import { supabase } from "./client";

//!Product
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Product
export async function getProducts() {
    let { data: Products, error } = await supabase.from("Product").select("*");
    if (error) {
        console.log(error)
        return null
    }
    console.log(Products)
    return Products
}

// *TODO: bucket de las imagenes
// insert data into the table Product
export async function insertProduct(name, price, withAddition, description, category) {
    const { data, error } = await supabase
        .from('Product')
        .insert([
            { name: name, price: price, withAddition: withAddition, description: description, category: category },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

async function uploadImage(file, productoId) {
    const filePath = `platos/${productoId}/${file.name}`; // Ej: platos/123/tacos.jpg
  
    // Subir la imagen al bucket
    const { data, error } = await supabase.storage
      .from('imagenesPlatos')
      .upload(filePath, file);
  
    if (error) {
      console.error('Error al subir imagen:', error);
      return null;
    }
  
    // Generar la URL pública o privada
    const { publicUrl } = supabase.storage.from('imagenesPlatos').getPublicUrl(filePath);
  
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

// *TODO: bucket de las imagenes
// update data in the table Product
export async function updateProduct(id, name, price, withAddition, text, category) {
    const { data, error } = await supabase
        .from('Product')
        .update({ name: name, price: price, withAddition: withAddition, text: text, category: category })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Product
export async function deleteProduct(id) {
    const { data, error } = await supabase
        .from('Product')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
//! Category
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Category
export async function getCategories() {
    let { data: Category, error } = await supabase
        .from('Category')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Category
}

// insert data into the table Category
export async function insertCategory(category_name) {
    const { data, error } = await supabase
        .from('Category')
        .insert([
            { category_name: category_name },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

// update data in the table Category
export async function updateCategory(id, category_name) {
    const { data, error } = await supabase
        .from('Category')
        .update({ category_name: category_name })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Category
export async function deleteCategory(id) {
    const { data, error } = await supabase
        .from('Category')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//!Addition
//!----------------------------------------------------------------------------------------------------------------------------
// get all data from the table Addition
export async function getAdditions() {
    let { data: Addition, error } = await supabase
        .from('Addition')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Addition
}

// insert data into the table Addition
export async function insertAddition(name, price) {
    const { data, error } = await supabase
        .from('Addition')
        .insert([
            { name: name, price: price },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}


// update data in the table Addition
export async function updateAddition(id, name, price) {
    const { data, error } = await supabase
        .from('Addition')
        .update({ name: name, price: price })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Addition
export async function deleteAddition(id) {
    const { data, error } = await supabase
        .from('Addition')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//!Domiciliary
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Domiciliary
export async function getDomiciliaries() {
    let { data: Domiciliary, error } = await supabase
        .from('Domiciliary')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Domiciliary
}

// insert data into the table Domiciliary
export async function insertDomiciliary(name) {
    const { data, error } = await supabase
        .from('Domiciliary')
        .insert([
            { name: name },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

// update data in the table Domiciliary
export async function updateDomiciliary(id, name) {
    const { data, error } = await supabase
        .from('Domiciliary')
        .update({ name: name })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Domiciliary
export async function deleteDomiciliary(id) {
    const { data, error } = await supabase
        .from('Domiciliary')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//!Neighborhood
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Neighborhood
export async function getNeighborhoods() {
    let { data: Neighborhood, error } = await supabase
        .from('Neighborhood')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Neighborhood
}

// insert data into the table Neighborhood
export async function insertNeighborhood(name, delivery_price) {
    const { data, error } = await supabase
        .from('Neighborhood')
        .insert([
            { name: name, delivery_price: delivery_price },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

// update data in the table Neighborhood
export async function updateNeighborhood(id, name, delivery_price) {
    const { data, error } = await supabase
        .from('Neighborhood')
        .update({ name: name, delivery_price: delivery_price })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Neighborhood
export async function deleteNeighborhood(id) {
    const { data, error } = await supabase
        .from('Neighborhood')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//!Order
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Order
export async function getOrders() {
    let { data: Order, error } = await supabase
        .from('Order')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Order
}

// insert data into the table Order
export async function insertOrder(product_id, additions, sauces, request) {
    const { data, error } = await supabase
        .from('Order')
        .insert([
            { product_id, additions, sauces, request },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

// update data in the table Order
export async function updateOrder(id, product_id, additions, sauces, request) {
    const { data, error } = await supabase
        .from('Order')
        .update({ product_id, additions, sauces, request })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Order
export async function deleteOrder(id) {
    const { data, error } = await supabase
        .from('Order')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//!Request
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Request
export async function getRequests() {
    let { data: Request, error } = await supabase
        .from('Request')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Request
}

// insert data into the table Request
export async function insertRequest(client, total,) {
    const { data, error } = await supabase
        .from('Request')
        .insert([
            { client, total },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

// update status in the table Request
export async function updateStatusRequest(id, status) {
    const { data, error } = await supabase
        .from('Request')
        .update({ status })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Request
export async function deleteRequest(id) {
    const { data, error } = await supabase
        .from('Request')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//!Route
//!----------------------------------------------------------------------------------------------------------------------------

// get all data from the table Route
export async function getRoutes() {
    let { data: Route, error } = await supabase
        .from('Route')
        .select('*')
    if (error) {
        console.log(error)
        return null
    }
    return Route
}

// insert data into the table Route
export async function insertRoute(domiciliary) {
    const { data, error } = await supabase
        .from('Route')
        .insert([
            { domiciliary },
        ])
        .select()
    if (error) {
        console.log(error)
        return null
    }
    /* {
      "status": 201,
       "statusText": "Created"
    }*/
    return data
}

// update data in the table Route
export async function updateRoute(domiciliary) {
    const { data, error } = await supabase
        .from('Route')
        .update({ domiciliary })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// delete data from the table Route
export async function deleteRoute(id) {
    const { data, error } = await supabase
        .from('Route')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}