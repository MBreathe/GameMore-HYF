export type AnticipatedGame = {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  first_release_date: number;
  name: string;
};
export type DetailsGame = {
  id: number;
  name: string;
  rating: number;
  releaseDate: number;
  genres: number[];
  platforms: number[];
  cover: number;
  summary: string;
};
export type SearchGame = {
  id: number;
  game: number;
  name: string;
};
export type MetaGame = {
  rating: number | undefined;
  releaseDate: string | undefined | null;
  genre: number[] | undefined;
  platform: number[] | undefined;
};
export type PosterGame = {
  game: number;
  url: string;
};
