import style from "./Date.module.css";

function Date({ date }: { date: string }) {
  return <p className={"roboto-normal " + style.date}>{date}</p>;
}

export default Date;
