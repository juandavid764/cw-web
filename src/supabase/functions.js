import { supabase } from "./client";

// get all data from the table Addition
export async function getAdditions() {
  let { data: Addition, error } = await supabase.from("Addition").select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return Addition;
}

// insert data into the table Addition
export async function insertAddition(someValue, otherValue) {
  const { data, error } = await supabase
    .from("Addition")
    .insert([{ some_column: someValue, other_column: otherValue }])
    .select();
  if (error) {
    console.log(error);
    return null;
  }
  /* {
      "status": 201,
       "statusText": "Created"
    }*/
  return data;
}

//LOGIN AND VALIDATION------------------------
// login with email and password and return the user data
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("desde pequeños rompiendo");
  if (error) throw error;
  return data;
};

// Close session
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

// get the current session state
export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// validate if the user is authenticated
export const isAuthenticated = async () => {
  const session = await getSession();
  return !!session; //if we have a session, we are authenticated
};
