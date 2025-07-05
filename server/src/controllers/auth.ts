import { Request, Response } from "express";
import fetcher from "../utils/fetcher";
import * as dotenv from "dotenv";

dotenv.config();

async function auth(req: Request, res: Response) {
    const clientId = process.env.CLIENT_ID;
    const secret = process.env.CLIENT_SECRET;
    const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`;
    const options = {method: "POST"};
    try {
        const data = await fetcher(url, res, options);
        res.json({ accessToken: data.access_token });
    } catch (e) {
        console.error(e);
        res.status(500).send("Authentification failed");
    }
}

export default auth;