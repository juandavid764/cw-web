import { supabase } from './client'

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
export async function insertAddition(someValue, otherValue) {
    const { data, error } = await supabase
        .from('Addition')
        .insert([
            { some_column: someValue, other_column: otherValue },
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



