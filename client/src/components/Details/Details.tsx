import GameMeta from "../GameMeta/GameMeta.tsx";
import { date } from "../../utils/dateCalc.ts";
import DetailsPoster from "../DetailsPoster/DetailsPoster.tsx";
import type { DetailsGame } from "../../types/api.ts";
import style from "./Details.module.css";

function Details({ details }: { details: DetailsGame }) {
  if (!details) return null;

  return (
    <div className={style.container}>
      <div className={style.textContainer}>
        <GameMeta
          rating={details?.rating}
          releaseDate={date(details?.releaseDate)}
          genre={details?.genres}
          platform={details?.platforms}
        />
        <p className={"roboto-normal " + style.summary}>{details?.summary}</p>
      </div>
      <DetailsPoster coverID={details?.cover} />
    </div>
  );
}

export default Details;
