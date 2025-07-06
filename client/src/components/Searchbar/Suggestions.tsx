import style from './Searchbar.module.css';
import {Link} from "react-router-dom";

export type GameObj = {
  id: number;
  game: number;
  name: string;
}

function Suggestions({ results }: { results: GameObj[] }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
      <ul className={style.suggestionsContainer + " roboto-italic"}>
        { results.map((result) => <li key={result.id}><Link to={`/games/${result.id}`} >{result.name}</Link></li>)}
      </ul>
      );
}

export default Suggestions;
