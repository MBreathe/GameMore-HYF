import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";
import isNumberOrArrayOfNumbers from "../utils/isNumberOrArrayOfNumbers";

type PlatformsObj = {
  id: number;
  abbreviation: string;
};

async function platforms(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!isNumberOrArrayOfNumbers(query)) {
    res.status(400).send("Query must be a number or an array of numbers");
    return;
  }

  const url = "https://api.igdb.com/v4/platforms";

  const filteredQuery = req.body.query.toString();
  const request = `fields abbreviation;
        where id = (${filteredQuery});`;

  const data: PlatformsObj[] = await postReq(res, req, url, request);
  const filteredData = data.map((obj) => obj.abbreviation).join(", ");
  res.json(filteredData);
}

export default platforms;
