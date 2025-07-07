import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";

type GenresObj = {
  id: number;
  name: string;
};

async function genres(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!query) return;

  const url = "https://api.igdb.com/v4/genres";
  const request = `fields name;
        where id = (${query});`;
  const data: GenresObj[] = await postReq(req, res, url, request);
  const filteredData = data.map((obj) => obj.name).join(", ");
  res.json(filteredData);
}

export default genres;
