import fetcher from "../utils/fetcher";
import * as dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

async function search(req: Request, res: Response) {
    if (!req.body.token || !req.body.query) {
        res.status(400).send("No token and/or query provided");
        return;
    }
    const { token, query } = req.body;
    const url = "https://api.igdb.com/v4/search";
    const request =
        `fields name, game;
        search "${query}";
        limit 5;`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
            "Authorization": "Bearer " + token,
            "Client-ID": process.env.CLIENT_ID
        },
        body: request
    }
    try {
        const data = await fetcher(url, res, options);
        res.json(data);
    } catch (e) {
        console.error(e);
        res.status(500).send("Couldn't fetch data for search");
    }
}

export default search;