import CountdownCard from "./CountdownCard.tsx";
import style from "./CountdownPanel.module.css";
import {useContext, useEffect, useState} from "react";
import {StatusContext} from "../../context/StatusContext.tsx";
import {timer} from "../../utils/dateCalc.ts";
import imgUrl from "../../utils/imgUrl.ts";
import ErrorBox from "../ErrorBox/ErrorBox.tsx";
import Loading from "../Loading/Loading.tsx";
import fetcher from "../../utils/fetcher.ts";
import {Link} from "react-router-dom";

type Game = {
    id: number;
    name: string;
    first_release_date: number;
    cover?: {
        id: number;
        url: string;
    }
    hypes: number;
}

function CountdownPanel() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("CountdownPanel must be used within a StatusContextProvider");
    }
    const { token } = context;

    const [data, setData] = useState<Game[] | null>(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchAuth = async () => {
            setLoading(true);
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token: token})
            }
            try {
                const data = await fetcher("http://localhost:3000/api/games/anticipated", options);
                setData(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
                else {
                    setError(String(e));
                }
            } finally {
                setLoading(false);
            }

        }

        fetchAuth();
    }, [setError, setLoading, token]);

    if (error) return <ErrorBox error={error} />
    if (loading) return <Loading />

    return (
        <div className={style.wrapper}>
            {data && data.map((game: Game) => {
                return (
                    <div key={game.id}>
                        <Link to={`/games/${game.id}`}>
                        <CountdownCard
                            text={game.name}
                            date={timer(game.first_release_date) || "date not found"}
                            img={game.cover ? imgUrl(game.cover.url, "t_720p") : "https://placehold.co/540x720"}
                        />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default CountdownPanel;