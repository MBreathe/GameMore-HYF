import { createContext, type JSX, useState } from "react";

type FavoriteContextType = {
  favorite: number[];
  setFavorite: (favorite: number[]) => void;
};

export const FavoritesContext = createContext<FavoriteContextType | null>(null);

export default function FavoritesContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [favorite, setFavorite] = useState<number[]>([]);

  return (
    <FavoritesContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
