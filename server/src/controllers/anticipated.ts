import { Request, Response } from "express";
import postReq from "./postReq";
import httpStatusCodes from "../services/httpStatusCodes";
import bodyCheck from "../utils/bodyCheck";

type AnticipatedObj = {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  first_release_date: number;
  hypes: number;
  name: string;
};

async function anticipated(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!query) return;
  if (typeof query !== "number") {
    res.status(httpStatusCodes.badRequest).json("Query must be a number");
    return;
  }
  if (query < 2) {
    res.status(httpStatusCodes.badRequest).json("Query must be greater than 2");
    return;
  }

  const url = "https://api.igdb.com/v4/games";
  const request = `fields name, first_release_date, cover.url, hypes;
        where first_release_date > 1751467522 & hypes != null;
        sort hypes desc;
        limit ${query};`;

  const data: AnticipatedObj[] = await postReq(req, res, url, request);
  const filteredData = data.map(({ hypes, ...rest }) => rest);
  res.json(filteredData);
}

export default anticipated;
