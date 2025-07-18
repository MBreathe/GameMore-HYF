import style from "./ErrorBox.module.css";

function ErrorBox({ error }: { error: string | null }) {
  if (!error) {
    return null;
  }

  return (
    <div className={style.container}>
      <h2 className={style.error + " roboto-normal"}>ERROR</h2>
      <p className="roboto-italic">{error}</p>
    </div>
  );
}

export default ErrorBox;
