import {useEffect, useContext, useState} from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import Searchbar from "../components/Searchbar/Searchbar.tsx";
import Title from "../components/Title.tsx";
import SuggestionCarousel from "../components/SuggestionCarousel/SuggestionCarousel.tsx";
import CountdownPanel from "../components/CountdownPanel/CountdownPanel.tsx";
import fetcher from "../utils/fetcher.ts";


function Home() {
    const [error, setError] = useState<string | null>("");
  const context = useContext(StatusContext);
  if (!context) {
      throw new Error("Home-page must be used within a StatusContextProvider");
  }
  const { token, setToken } = context;

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const data = await fetcher("http://localhost:3000/api/auth", { method: "POST" });
                setToken(data.accessToken);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            }
        }
        if (!token || token.length === 0) {
            refreshToken();
        }
    }, [setToken, token]);

  return (
    <>
      <Searchbar />
      <Title text="Most anticipated" />
        <CountdownPanel />
    </>
  );
}

export default Home;
