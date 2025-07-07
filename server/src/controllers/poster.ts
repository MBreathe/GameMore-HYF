import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";
import httpStatusCodes from "../services/httpStatusCodes";

async function poster(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!query) return;
  if (typeof query !== "number") {
    res.status(httpStatusCodes.badRequest).send("Query must be a number");
    return;
  }

  const url = "https://api.igdb.com/v4/covers";
  const request = `fields game,url;
        where id = ${req.body.query};`;
  const data = await postReq(req, res, url, request);
  res.json({
    game: data[0].game,
    url: data[0].url,
  });
}

export default poster;
