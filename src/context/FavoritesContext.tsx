import { createContext, type JSX, useState } from "react";

type FavoriteContextType = {
  favorite: string[];
  setFavorite: (favorite: string[]) => void;
};

export const FavoritesContext = createContext<FavoriteContextType | null>(null);

export default function FavoritesContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [favorite, setFavorite] = useState<string[]>([]);

  return (
    <FavoritesContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
