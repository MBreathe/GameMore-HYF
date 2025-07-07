import CountdownCard from "./CountdownCard.tsx";
import style from "./CountdownPanel.module.css";
import { useContext, useMemo } from "react";
import { StatusContext } from "../../context/StatusContext.tsx";
import { timer } from "../../utils/dateCalc.ts";
import imgUrl from "../../utils/imgUrl.ts";
import ErrorBox from "../ErrorBox/ErrorBox.tsx";
import Loading from "../Loading/Loading.tsx";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import type { AnticipatedGame } from "../../types/api.ts";

function CountdownPanel() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error(
      "CountdownPanel must be used within a StatusContextProvider",
    );
  }
  const { token } = context;

  const options = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, query: 6 }),
    }),
    [token],
  );

  const { data, loading, error } = useFetch<AnticipatedGame[]>(
    "http://localhost:3000/api/games/anticipated",
    token,
    options,
  );

  if (error) return <ErrorBox error={error} />;
  if (loading) return <Loading />;

  return (
    <div className={style.wrapper}>
      {data &&
        data.map((game) => {
          return (
            <div key={game.id}>
              <Link to={`/games/${game.id}`}>
                <CountdownCard
                  text={game.name}
                  date={timer(game.first_release_date) || "date not found"}
                  img={
                    game.cover
                      ? imgUrl(game.cover.url, "t_720p")
                      : "https://placehold.co/540x720"
                  }
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default CountdownPanel;
