import { useEffect, useState } from "react";

function useFetch(url: string | null, token: string | null, options?: RequestInit) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        setData(null);
        setError(null);
        setLoading(false);
        if (!url || !token) return;


        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    const error = response.statusText || `Error: ${response.status}`;
                    return setError(error);
                }
                setData(await response.json());
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options, token]);

    return { data, loading, error };
}

export default useFetch;