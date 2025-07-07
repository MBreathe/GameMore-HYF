import style from "./GameMeta.module.css";

function MetaData({ title, value }: { title: string; value: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <div className={style.container}>
      <h2 className={"inter-medium " + style.title}>{title}</h2>
      <p className={"roboto-normal " + style.value}>{value}</p>
    </div>
  );
}

export default MetaData;
