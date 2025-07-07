import SubTitle from "../SubTitle.tsx";
import Date from "../Date.tsx";
import style from "./CountdownPanel.module.css";

function CountdownCard({
  text,
  date,
  img,
}: {
  text: string;
  date: string;
  img: string;
}) {
  return (
    <div className={style.cardContainer}>
      <div className={style.textContainer}>
        <SubTitle text={text} />
        <Date date={date} />
      </div>
      <img className={style.thumbnail} src={img} alt="poster" />
    </div>
  );
}

export default CountdownCard;
