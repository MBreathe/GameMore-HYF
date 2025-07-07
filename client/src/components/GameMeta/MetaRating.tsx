import style from "./GameMeta.module.css";

function MetaRating({ rating }: { rating: number | undefined }) {
  if (!rating) return null;
  const stars = Math.round(rating / 20);

  return (
    <div className={style.container}>
      <h2 className={"inter-medium " + style.title}>Rating</h2>
      <div className={style.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={`${style.star} ${star <= stars ? style.starFilled : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MetaRating;
