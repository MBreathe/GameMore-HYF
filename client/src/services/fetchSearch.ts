import fetcher from "../utils/fetcher.ts";
import type { StatusContextType } from "../context/StatusContext.tsx";

async function fetchSearch(input: string, token: StatusContextType["token"], setResults: (results: string[]) => void, setError: StatusContextType["setError"], setSearching: (searching: boolean) => void) {
    if (!input) return;
    setSearching(true);
    setError(null);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            query: input
        })
    }
    try {
        const data = await fetcher("http://localhost:3000/api/search", options);
        setResults(data);

    } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
    } finally {
        setSearching(false);
    }
}

export default fetchSearch;