import MetaData from "./MetaData.tsx";
import MetaRating from "./MetaRating.tsx";
import useFetch from "../../hooks/useFetch.ts";
import { StatusContext } from "../../context/StatusContext.tsx";
import { useContext, useEffect, useMemo, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox.tsx";
import Loading from "../Loading/Loading.tsx";
import style from "./GameMeta.module.css";
import type { MetaGame } from "../../types/api.ts";

function GameMeta({ rating, releaseDate, genre, platform }: MetaGame) {
  const [genreString, setGenreString] = useState<string | null>(null);
  const [platformsString, setPlatformsString] = useState<string | null>(null);
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("GameMeta must be used within a StatusContextProvider");
  }
  const { token, error } = context;

  const genresOptions = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        query: genre,
      }),
    }),
    [genre, token],
  );
  const platformsOptions = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        query: platform,
      }),
    }),
    [platform, token],
  );

  const { data: genresData, loading: genresLoading } = useFetch<string>(
    `http://localhost:3000/api/games/genres`,
    token,
    genresOptions,
  );
  const { data: platformsData, loading: platformsLoading } = useFetch<string>(
    `http://localhost:3000/api/games/platforms`,
    token,
    platformsOptions,
  );

  useEffect(() => {
    const formatData = () => {
      if (!genresData || !platformsData) return;
      setGenreString(genresData);
      setPlatformsString(platformsData);
    };
    formatData();
  }, [genresData, platform, platformsData]);

  if (genresLoading || platformsLoading) return <Loading />;

  return (
    <div className={style.wrapper}>
      <MetaRating rating={rating} />
      <MetaData title="Release Date" value={releaseDate} />
      <MetaData title="Genre" value={genreString} />
      <MetaData title="Platform" value={platformsString} />
      {error && <ErrorBox error={error} />}
    </div>
  );
}

export default GameMeta;
