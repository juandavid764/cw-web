import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as React from 'react';
import TextField from '@mui/material/TextField';

//Usa credenciales para conectarse a la base de datos
const supabase = createClient("https://dclxxyjisswjmtyyovaf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbHh4eWppc3N3am10eXlvdmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0Mzk5MDMsImV4cCI6MjAzNTAxNTkwM30.zIEZ1B9ZXR38pQDKxeaLPQ9a_9OhRgyCs-2EGzhbFaY");




//Componente funcional llamado "app"
function App() {
  //Escucha todos los cambios de una tabla especifica
  supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'countries' }, payload => {
      getCountries()
    })
    .subscribe()

  //Se crea una variable de estado (countries) y una funcion (setCountries) para actualizarla
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    getCountries();
  }, []);


  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);

    console.log("Cambios escuchados")
  }

  async function insertCountry() {
    const { error } = await supabase
      .from('countries')
      .insert({name: inputValue })

      console.log("Respuesta: "+error.message)
  }

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
      <TextField id="" label="Filled" variant="outlined" className="bg-orange-300 md:bg-fuchsia-300 lg:bg-green-400 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"/>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border border-black rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <br>
      </br>
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Enviar
      </button>
      {/* //onClick={insertCountry} */}
    </>
  );
}

export default App;