import { Request, Response } from "express";
import httpStatusCodes from "../services/httpStatusCodes";

function bodyCheck(req: Request, res: Response) {
  if (!req.body) {
    res.status(httpStatusCodes.badRequest).send("No body provided");
    return;
  }
  if (!req.body.query) {
    res
      .status(httpStatusCodes.badRequest)
      .send("No query provided inside body");
    return;
  }
  return req.body.query;
}

export default bodyCheck;
