
export async function getFormatRequest() {
    let { data: formatted_request_products, error } = await supabase
        .from('formatted_request_products')
        .select('*')
    if (error) {
        console.log(error);
        return null;
    }

    return formatted_request_products;
}
