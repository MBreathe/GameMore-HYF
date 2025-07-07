import { Request, Response } from "express";
import postReq from "./postReq";
import httpStatusCodes from "../services/httpStatusCodes";
import bodyCheck from "../utils/bodyCheck";

type GameDetailsObj = {
  id: number;
  age_ratings?: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  artworks?: number[];
  category?: number;
  cover?: number;
  created_at?: number;
  external_games?: number[];
  first_release_date?: number;
  game_engines?: number[];
  game_modes?: number[];
  genres?: number[];
  hypes?: number;
  involved_companies?: number[];
  keywords?: number[];
  multiplayer_modes?: number[];
  name?: string;
  platforms?: number[];
  player_perspectives?: number[];
  rating?: number;
  rating_count?: number;
  release_dates?: number[];
  screenshots?: number[];
  similar_games?: number[];
  slug?: string;
  storyline?: string;
  summary?: string;
  tags?: number[];
  themes?: number[];
  total_rating?: number;
  total_rating_count?: number;
  updated_at?: number;
  url?: string;
  videos?: number[];
  websites?: number[];
  checksum?: string;
  language_supports?: number[];
  game_localizations?: number[];
  game_type?: number;
};

async function gameDetails(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!query) return;

  const url = "https://api.igdb.com/v4/games";
  const request = `fields *;
        where id = ${query};`;

  const data: GameDetailsObj[] = await postReq(req, res, url, request);
  const filteredData = data.map(
    ({
      id,
      name,
      rating,
      first_release_date,
      genres,
      platforms,
      cover,
      summary,
      ...rest
    }) => ({
      id,
      name,
      rating,
      releaseDate: first_release_date,
      genres,
      platforms,
      cover,
      summary,
    }),
  );
  res.json(filteredData[0]);
}

export default gameDetails;
