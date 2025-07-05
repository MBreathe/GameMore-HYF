import CountdownCard from "./CountdownCard.tsx";
import style from "./CountdownPanel.module.css";
import useFetch from "../../hooks/useFetch.tsx";
import {useContext, useEffect} from "react";
import {StatusContext} from "../../context/StatusContext.tsx";
import dateCalc from "../../utils/dateCalc.ts";
import imgUrl from "../../utils/imgUrl.ts";
import ErrorBox from "../ErrorBox/ErrorBox.tsx";
import Loading from "../Loading/Loading.tsx";

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
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("CountdownPanel must be used within a StatusContextProvider");
    }
    const { token, loading, error, setError } = context;

    const url = "https://api.igdb.com/v4/games";
    const request =
        "fields name, first_release_date, cover.url, hypes;\n" +
        "where first_release_date > 1751467522 & hypes != null;\n" +
        "sort hypes desc;\n" +
        "limit 6;";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
            "Authorization": "Bearer " + token
        },
        body: request
    }
    const { data } = useFetch<Game[]>(url, options);

    useEffect(() => {
        if (!data) {
            setError("Error while fetching data");
        }
    }, [data, setError]);

    if (error) {
        return <ErrorBox error={error} />
    }
    if (loading) {
        return <Loading />
    }

    return (
        <div className={style.wrapper}>
            {data && data.map((game: Game) => {
                return (
                    <CountdownCard
                        key={game.id}
                        text={game.name}
                        date={dateCalc(game.first_release_date) || "date not found"}
                        img={game.cover ? imgUrl(game.cover.url, "t_720p") : "https://placehold.co/540x720"}
                    />
                )
            })}
        </div>
    )
}

export default CountdownPanel;