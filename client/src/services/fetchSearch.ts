import fetcher from "../utils/fetcher.ts";
import type { StatusContextType } from "../context/StatusContext.tsx";
import type { GameObj } from "../components/Searchbar/Suggestions.tsx";

async function fetchSearch(input: string, token: StatusContextType["token"], setResults: (results: GameObj[]) => void, setError: (error: (string | null)) => void, setLoading: (loading: boolean) => void) {
    if (!input) return;
    setloading(true);
    setError(null);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
            query: input.toLowerCase()
        })
    }
    try {
        const data = await fetcher("http://localhost:3000/api/games/search", options);
        setResults(data);
    } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        setResults([]);
    } finally {
        setLoading(false);
    }
}

export default fetchSearch;