import { useEffect, useContext } from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import Searchbar from "../components/Searchbar/Searchbar.tsx";
import Title from "../components/Title.tsx";
import SuggestionCarousel from "../components/SuggestionCarousel/SuggestionCarousel.tsx";
import CountdownPanel from "../components/CountdownPanel/CountdownPanel.tsx";
import fetchAuth from "../services/fetchAuth.ts";


function Home() {
  const context = useContext(StatusContext);
  if (!context) {
      throw new Error("Home-page must be used within a StatusContextProvider");
  }
  const { setToken, setError } = context;

  useEffect(() => {
      fetchAuth(setError, setToken);
  }, [setError, setToken]);

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
