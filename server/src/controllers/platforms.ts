import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";

type PlatformsObj = {
  id: number;
  abbreviation: string;
};

async function platforms(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!query) return;

  const url = "https://api.igdb.com/v4/platforms";

  const request = `fields abbreviation;
        where id = (${query.toString()});`;

  const data: PlatformsObj[] = await postReq(req, res, url, request);
  const filteredData = data.map((obj) => obj.abbreviation).join(", ");
  res.json(filteredData);
}

export default platforms;
