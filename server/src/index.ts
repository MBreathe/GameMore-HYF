import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import auth from "./controllers/auth";
import anticipated from "./controllers/anticipated";
import cors from "cors";
import search from "./controllers/search";
import gameDetails from "./controllers/gameDetails";
import genres from "./controllers/genres";
import platforms from "./controllers/platforms";
import poster from "./controllers/poster";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (_: Request, res: Response) => {
  res.send("Server is running");
});
app.post("/api/auth", auth);
app.post("/api/games/anticipated", anticipated);
app.post("/api/games/search", search);
app.post("/api/games/details", gameDetails);
app.post("/api/games/genres", genres);
app.post("/api/games/platforms", platforms);
app.post("/api/games/poster", poster);

const port = Number(process.env.PORT) || 3000;
app.listen(port);