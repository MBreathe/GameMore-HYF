import FavButton from "../FavButton/FavButton.tsx";
import useFetch from "../../hooks/useFetch.ts";
import { StatusContext } from "../../context/StatusContext.tsx";
import { useContext, useMemo } from "react";
import Loading from "../Loading/Loading.tsx";
import type { DetailsGame, PosterGame } from "../../types/api.ts";
import imgUrl from "../../utils/imgUrl.ts";
import style from "./FavGame.module.css";
import { Link } from "react-router-dom";

function FavGame({ gameID }: { gameID: number }) {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("FavGame must be used within a StatusContextProvider");
  }
  const { token } = context;

  const detailsOptions = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        query: gameID,
      }),
    }),
    [gameID, token],
  );
  const { data: details, loading: loadingDetails } = useFetch<DetailsGame>(
    `http://localhost:3000/api/games/details`,
    token,
    detailsOptions,
  );

  const posterOptions = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        query: details?.cover,
      }),
    }),
    [details, token],
  );
  const { data: poster, loading: loadingPoster } = useFetch<PosterGame>(
    `http://localhost:3000/api/games/poster`,
    token,
    posterOptions,
  );

  return (
    <div className={style.wrapper}>
      {loadingPoster || (loadingDetails && <Loading />)}
      <FavButton game={gameID} />
      <Link to={`/games/${gameID}`}>
        <img
          className={style.img}
          src={imgUrl(poster?.url, "t_1080p")}
          alt="poster"
        />
        <h2 className={"roboto-normal " + style.tag}>{details?.name}</h2>
      </Link>
    </div>
  );
}

export default FavGame;
