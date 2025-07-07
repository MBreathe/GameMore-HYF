import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../context/StatusContext.tsx";

function useFetch<T>(
  url: string | null,
  token: string | null,
  options: RequestInit,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useFetch must be used within a StatusContextProvider");
  }
  const { setError } = context;

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(false);
    if (!url || !token) return;
    if (!options) return;

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
  }, [url, options, token, setError]);

  return { data, loading };
}

export default useFetch;
