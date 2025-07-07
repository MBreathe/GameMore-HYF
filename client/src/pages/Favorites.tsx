import Title from "../components/Title.tsx";
import { FavoritesContext } from "../context/FavoritesContext.tsx";
import { useContext } from "react";
import { StatusContext } from "../context/StatusContext.tsx";
import ErrorBox from "../components/ErrorBox/ErrorBox.tsx";
import FavGame from "../components/FavGame/FavGame.tsx";

function Favorites() {
  const favContext = useContext(FavoritesContext);
  const context = useContext(StatusContext);
  if (!favContext || !context) {
    throw new Error(
      "Favorites must be used within a FavoritesContextProvider and StatusContextProvider",
    );
  }
  const { error } = context;
  const { favorite } = favContext;

  return (
    <div>
      {error && <ErrorBox error={error} />}
      <Title text="Favorites" />
      <div>
        {favorite.length === 0 ? (
          <p
            className="roboto-italic"
            style={{
              background: "var(--accent-color)",
              padding: "0.1rem 0.5rem",
              display: "inline",
            }}
          >
            No favorites
          </p>
        ) : (
          favorite.map((game) => <FavGame gameID={game} />)
        )}
      </div>
    </div>
  );
}

export default Favorites;
