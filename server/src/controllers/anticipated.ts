import fetcher from "../utils/fetcher";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

async function anticipated(req: Request, res: Response) {
    if (!req.body.token) {
        res.status(400).send("No token provided");
        return;
    }
    const { token } = req.body;
    const url = "https://api.igdb.com/v4/games";
    const request =
        `fields name, first_release_date, cover.url, hypes;
        where first_release_date > 1751467522 & hypes != null;
        sort hypes desc;
        limit 6;`
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
        return;
    } catch (e) {
        console.error(e);
        res.status(500).send("Couldn't fetch data for anticipated games");
        return;
    }
}

export default anticipated;