import { useEffect, useMemo, useContext } from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import useFetch from "../hooks/useFetch.tsx";
import Searchbar from "../components/Searchbar/Searchbar.tsx";
import Title from "../components/Title.tsx";
import CountdownPanel from "../components/CountdownPanel/CountdownPanel.tsx";
import SuggestionCarousel from "../components/SuggestionCarousel/SuggestionCarousel.tsx";

interface AuthRes {
    access_token: string;
    expires_in: number;
    token_type: string;
}

function Home() {
  const context = useContext(StatusContext);
  if (!context) {
      throw new Error("Home-page must be used within a StatusContextProvider");
  }
  const { setToken, setError } = context;

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const secret = import.meta.env.VITE_CLIENT_SECRET;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`;
  const options = useMemo(() => ({
      method: "POST"
  }), []);
  const { data } = useFetch(url, options);

  useEffect(() => {
      if (!data) {
          setError("Error while fetching token");
          return;
      }
      const { access_token } = data as AuthRes;
      setToken(access_token);

  }, [data, setToken, setError]);

  return (
    <>
      <Searchbar />
      <Title text="Most anticipated" />
        <CountdownPanel />
      <Title text="Top rated" />
        <SuggestionCarousel />
    </>
  );
}

export default Home;
