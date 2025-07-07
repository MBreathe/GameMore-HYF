import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useMemo, useState } from "react";
import { StatusContext } from "../../context/StatusContext.tsx";
import imgUrl from "../../utils/imgUrl.ts";
import ErrorBox from "../ErrorBox/ErrorBox.tsx";
import Loading from "../Loading/Loading.tsx";
import style from "./DetailsPoster.module.css";
import type { PosterGame } from "../../types/api.ts";
import FavButton from "../FavButton/FavButton.tsx";

function DetailsPoster({ coverID }: { coverID: number | undefined }) {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error(
      "DetailsPoster must be used within a StatusContextProvider",
    );
  }
  const { token, error } = context;
  const url = "http://localhost:3000/api/games/poster";
  const options = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, query: coverID }),
    }),
    [coverID, token],
  );

  const { data, loading } = useFetch<PosterGame>(url, token, options);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data?.url) {
      setSrc(imgUrl(data.url, "t_1080p"));
    }
  }, [data]);

  if (error) return <ErrorBox error={error} />;
  if (loading) return <Loading />;

  return (
    <div className={style.wrapper}>
      <img className={style.poster} src={src || undefined} alt="Poster" />
      <FavButton game={data?.game} />
    </div>
  );
}

export default DetailsPoster;
