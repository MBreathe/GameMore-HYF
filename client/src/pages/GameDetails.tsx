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
import DetailsPoster from "../components/DetailsPoster/DetailsPoster.tsx";

function GameDetails() {
  const { id } = useParams();

  const [authError, setAuthError] = useState<string | null>(null);

  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("GameDetails must be used within a StatusContextProvider");
  }
  const { token, setToken, error } = context;

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

  const { data: details, loading } = useFetch<DetailsGame>(
    "http://localhost:3000/api/games/details",
    token,
    options,
  );

  if (loading) return <Loading />;

  return (
    <>
      {error || authError ? <ErrorBox error={error || authError} /> : null}
      <Title text={details?.name} />
      <div style={{ display: "flex", gap: "1rem" }}>
        <div>
          <GameMeta
            rating={details?.rating}
            releaseDate={date(details?.releaseDate)}
            genre={details?.genres}
            platform={details?.platforms}
          />
          <p
            className="roboto-normal"
            style={{
              borderTop: "2px solid var(--text-color)",
              margin: "2rem 2rem 2rem 0",
              paddingTop: "1rem",
            }}
          >
            {details?.summary}
          </p>
        </div>
        <DetailsPoster coverID={details?.cover} />
      </div>
    </>
  );
}

export default GameDetails;
