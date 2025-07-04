import SubTitle from "../SubTitle.tsx";
import Date from "../Date.tsx";
import {useState} from "react";
import style from "./CountdownPanel.module.css";

function CountdownCard() {
    const [text, setText] = useState('GrandTheft Auto VI');
    const [date, setDate] = useState('00/00/00');

    return (
        <div className={style.cardContainer}>
            <div className={style.textContainer}>
                <SubTitle text={text}/>
                <Date date={date}/>
            </div>
            <img className={style.thumbnail} src="https://images.igdb.com/igdb/image/upload/t_cover_big/co9rwo.jpg" alt="poster"/>
        </div>
    )
}

export default CountdownCard;