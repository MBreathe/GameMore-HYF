import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../context/StatusContext.tsx";

function useFetch(url: string, options?: object) {
  const [data, setData] = useState(null);
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useFetch must be used within a StatusContextProvider");
  }
  const { loading, setLoading, error, setError } = context;

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(false);

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          return setError(response.statusText);
        }
        setData(await response.json());
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, setLoading, setError]);

  return { data, loading, error };
}

export default useFetch;
