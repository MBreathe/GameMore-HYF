import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";
import httpStatusCodes from "../services/httpStatusCodes";

async function search(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!query) return;
  if (typeof query !== "string") {
    res.status(httpStatusCodes.badRequest).send("Query must be a string");
    return;
  }
  if (query.length < 3) {
    res
      .status(httpStatusCodes.badRequest)
      .send("Query must be at least 3 characters long");
    return;
  }
  if (query.length > 50) {
    res
      .status(httpStatusCodes.badRequest)
      .send("Query must be less than 50 characters long");
    return;
  }

  const url = "https://api.igdb.com/v4/search";
  const request = `fields name, game;
        search "${query}";
        limit 10;`;
  const data = await postReq(req, res, url, request);
  res.json(data);
}

export default search;
