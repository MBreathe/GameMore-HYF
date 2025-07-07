import { useEffect, useContext } from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import Searchbar from "../components/Searchbar/Searchbar.tsx";
import Title from "../components/Title.tsx";
import CountdownPanel from "../components/CountdownPanel/CountdownPanel.tsx";
import fetcher from "../utils/fetcher.ts";
import ErrorBox from "../components/ErrorBox/ErrorBox.tsx";

function Home() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("Home-page must be used within a StatusContextProvider");
  }
  const { token, setToken, error, setError } = context;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const data = await fetcher("http://localhost:3000/api/auth", {
          method: "POST",
        });
        setToken(data.accessToken);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    };
    if (!token || token.length === 0) {
      refreshToken();
    }
  }, [setError, setToken, token]);

  return (
    <>
      <Searchbar />
      <Title text="Most anticipated" />
      <CountdownPanel />
      {error && <ErrorBox error={error} />}
    </>
  );
}

export default Home;
