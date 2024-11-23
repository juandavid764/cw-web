import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

//const supabase = createClient("https://dclxxyjisswjmtyyovaf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbHh4eWppc3N3am10eXlvdmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0Mzk5MDMsImV4cCI6MjAzNTAxNTkwM30.zIEZ1B9ZXR38pQDKxeaLPQ9a_9OhRgyCs-2EGzhbFaY"); // Asegúrate de tener tu cliente supabase configurado

export default function ProductList() {
    const [adiciones, setAdiciones] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('Addition')
                .select();

            if (error) {
                setError(error.message);
            } else {
                setAdiciones(data);  // Almacenar los datos en el estado
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Lista de Adiciones</h1>
            <ul>
                {adiciones.map(adicion => (
                    <li key={adicion.id}>{adicion.name}</li>  // Asumiendo que hay un campo 'name'
                ))}
            </ul>
        </div>
    );
}
