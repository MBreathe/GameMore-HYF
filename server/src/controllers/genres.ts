import { Request, Response } from "express";
import postReq from "./postReq";
import bodyCheck from "../utils/bodyCheck";
import httpStatusCodes from "../services/httpStatusCodes";
import isNumberOrArrayOfNumbers from "../utils/isNumberOrArrayOfNumbers";

type GenresObj = {
  id: number;
  name: string;
};

async function genres(req: Request, res: Response) {
  const query = bodyCheck(req, res);
  if (!isNumberOrArrayOfNumbers(query)) {
    res
      .status(httpStatusCodes.badRequest)
      .send("Query must be a number or an array of numbers");
    return;
  }

  const url = "https://api.igdb.com/v4/genres";
  const filteredQuery = query.toString();
  const request = `fields name;
        where id = (${filteredQuery});`;
  const data: GenresObj[] = await postReq(res, req, url, request);
  const filteredData = data.map((obj) => obj.name).join(", ");
  res.json(filteredData);
}

export default genres;
