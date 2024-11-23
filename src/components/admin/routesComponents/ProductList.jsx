import { useState, useEffect } from 'react';

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
