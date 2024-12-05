
export async function getFormatRequest() {

    let { data, error } = await supabase
        .rpc('get_recent_requests_2_days')
    if (error) console.error(error)
    else console.log(data)

    return data;
}
