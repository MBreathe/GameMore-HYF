import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../context/FavoritesContext.tsx";
import style from "./FavButton.module.css";

function FavButton({ game }: { game: number | undefined }) {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "FavoriteButton must be used within a FavoritesContextProvider",
    );
  }
  const { favorite, setFavorite } = context;
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!game) return;
    if (!favorite) return;
    if (favorite.includes(game)) {
      setSrc("/heart/heart.png");
    } else {
      setSrc("/heart/hollow-heart.png");
    }
  }, [favorite, game]);

  return (
    <img
      className={style.favButton}
      src={src}
      alt="favorite"
      onClick={() => {
        if (typeof game !== "number") return;
        setFavorite(
          favorite?.includes(game)
            ? favorite.filter((id) => id !== game)
            : [...favorite, game],
        );
      }}
    />
  );
}

export default FavButton;
