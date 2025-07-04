import { useState, useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch.tsx";
import Loading from "../components/Loading/Loading.tsx";
import Searchbar from "../components/Searchbar/Searchbar.tsx";
import Title from "../components/Title.tsx";
import CountdownPanel from "../components/CountdownPanel/CountdownPanel.tsx";
import SuggestionCarousel from "../components/SuggestionCarousel/SuggestionCarousel.tsx";

function Home() {
  const [loading, setLoading] = useState(true);

  const clientId = "b3stp09cuksltcadr0w66x1kx57t93";
  const secret = "jcetem00addbzrknr4kv6io6t64xz0";
  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`;
  const options = useMemo(() => ({
      method: "POST"
  }), []);

  const { data } = useFetch(url, options);

  useEffect(() => {
      console.log(data);
  }, [data]);

  setTimeout(() => {
    setLoading(false);
  }, 5000);


  return (
    <>
      <Searchbar />
      <Title text="Most anticipated" />
        <CountdownPanel />
      {loading && <Loading />}
      <Title text="Top rated" />
        <SuggestionCarousel />
    </>
  );
}

export default Home;
