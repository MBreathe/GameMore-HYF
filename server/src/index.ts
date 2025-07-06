import express, {Request, Response} from 'express';
import * as dotenv from 'dotenv';
import * as process from "node:process";
import auth from "./controllers/auth";
import anticipated from "./controllers/anticipated";
import cors from "cors";
import search from "./controllers/search";
import gameDetails from "./controllers/gameDetails";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (_: Request, res: Response) => {
    res.send('Server is running')
});
app.post('/api/auth', auth);
app.post('/api/games/anticipated', anticipated);
app.post('/api/games/search', search);
app.post('/api/games/details', gameDetails);

const port = Number(process.env.PORT) || 3000;
app.listen(port);