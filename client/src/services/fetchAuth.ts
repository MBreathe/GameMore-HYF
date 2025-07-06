import fetcher from "../utils/fetcher.ts";
import type { StatusContextType } from "../context/StatusContext.tsx";

async function fetchAuth(setError: (error: (string | null)) => void, setToken: StatusContextType["setToken"]) {
    try {
        const data = await fetcher("http://localhost:3000/api/auth", { method: "POST" });
        setToken(data.accessToken);
    } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
    }
}

export default fetchAuth;