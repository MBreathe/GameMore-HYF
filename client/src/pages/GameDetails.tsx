import { useParams } from "react-router-dom";
import { useEffect, useContext, useMemo, useState } from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import Title from "../components/Title.tsx";
import GameMeta from "../components/GameMeta/GameMeta.tsx";
import { date } from "../utils/dateCalc.ts";
import useFetch from "../hooks/useFetch.ts";
import fetcher from "../utils/fetcher.ts";
import Loading from "../components/Loading/Loading.tsx";
import ErrorBox from "../components/ErrorBox/ErrorBox.tsx";
import type { DetailsGame } from "../types/api.ts";

function GameDetails() {
  const { id } = useParams();

  const [authError, setAuthError] = useState<string | null>(null);
  const [details, setDetails] = useState<DetailsGame | null>(null);

  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("GameDetails must be used within a StatusContextProvider");
  }
  const { token, setToken } = context;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const data = await fetcher("http://localhost:3000/api/auth", {
          method: "POST",
        });
        setToken(data.accessToken);
      } catch (e) {
        setAuthError(e instanceof Error ? e.message : String(e));
      }
    };
    if (!token || token.length === 0) {
      refreshToken();
    }
  }, [setToken, token]);

  const options = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        query: id,
      }),
    }),
    [id, token],
  );

  const { data, loading, error } = useFetch<DetailsGame[]>(
    "http://localhost:3000/api/games/details",
    token,
    options,
  );

  useEffect(() => {
    const dataChange = () => {
      if (!data) return;
      setDetails(data?.[0]);
    };
    dataChange();
  }, [data]);

  if (loading) return <Loading />;

  return (
    <>
      {error || authError ? <ErrorBox error={error || authError} /> : null}
      <Title text={details?.name} />
      <div>
        <GameMeta
          rating={details?.rating}
          releaseDate={date(details?.releaseDate)}
          genre={details?.genres}
          platform={details?.platforms}
        />
      </div>
    </>
  );
}

export default GameDetails;
