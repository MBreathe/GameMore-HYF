import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import fetcher from "../utils/fetcher.ts";


function GameDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("GameDetails must be used within a StatusContextProvider");
    }
    const { token } = context;

    useEffect(() => {
        async function fetchDetails(id, setError, setLoading, setDetails) {
            setLoading(true);
            setError(null);

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    query: id
                })
            }
            try {
                const data = await fetcher("http://localhost:3000/api/games/details", options);
                setDetails(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
                setDetails([]);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails(id, setError, setLoading, setDetails);
    }, [id])

    return <h1>Game Details {id}</h1>
}

export default GameDetails;