import { Response } from "express";

async function fetcher(url: string, res: Response, options?: object) {
  const response = await fetch(url, options);

  if (!response.ok)
    return res.status(response.status).send(response.statusText);

  return await response.json();
}

export default fetcher;
