import fetcher from "../utils/fetcher.ts";
import type { StatusContextType } from "../context/StatusContext.tsx";

async function fetchAuth(setError: StatusContextType["setError"], setToken: StatusContextType["setToken"]) {
    try {
        const data = await fetcher("http://localhost:3000/api/auth", { method: "POST" });
        setToken(data.accessToken);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError(String(e));
        }
    }
}

export default fetchAuth;