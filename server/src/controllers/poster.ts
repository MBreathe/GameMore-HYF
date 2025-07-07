import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";
import httpStatusCodes from "../services/httpStatusCodes";

async function poster(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (typeof query !== "number") {
    res.status(httpStatusCodes.badRequest).send("Query must be a number");
    return;
  }

  const url = "https://api.igdb.com/v4/covers";
  const request = `fields url;
        where id = ${req.body.query};`;
  const data = await postReq(res, req, url, request);
  res.json(data[0].url);
}

export default poster;
