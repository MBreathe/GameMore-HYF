import fetcher from "../utils/fetcher";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import httpStatusCodes from "../services/httpStatusCodes";

dotenv.config();

async function postReq(
  res: Response,
  req: Request,
  url: string,
  request: string,
) {
  if (!req.body.token) {
    res.status(httpStatusCodes.badRequest).send("No token provided");
    return;
  }
  const { token } = req.body;
  if (typeof token !== "string") {
    res.status(httpStatusCodes.badRequest).send("Token must be a string");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Authorization: "Bearer " + token,
      "Client-ID": process.env.CLIENT_ID,
    },
    body: request,
  };
  try {
    return await fetcher(url, res, options);
  } catch (e) {
    res
      .status(httpStatusCodes.internalServerError)
      .send(e instanceof Error ? e.message : String(e));
  }
}

export default postReq;
