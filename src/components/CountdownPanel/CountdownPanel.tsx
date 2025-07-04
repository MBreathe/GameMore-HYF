import CountdownCard from "./CountdownCard.tsx";
import style from "./CountdownPanel.module.css";

function CountdownPanel() {

    return (
        <div className={style.wrapper}>
            <CountdownCard />
            <CountdownCard />
            <CountdownCard />
            <CountdownCard />
            <CountdownCard />
            <CountdownCard />
        </div>
    )
}

export default CountdownPanel;