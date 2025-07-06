import {useEffect, useState, useContext} from "react";
import Suggestions from "./Suggestions.tsx";
import style from "./Searchbar.module.css";
import { StatusContext } from "../../context/StatusContext.tsx";
import type {GameObj} from "./Suggestions.tsx";
import fetchSearch from "../../services/fetchSearch.ts";

function Searchbar() {
    const [error, setError] = useState<string | null>("");
    const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<GameObj[]>([]);

  const context = useContext(StatusContext);
  if (!context) {
      throw new Error("Searchbar must be used within a StatusContextProvider");
  }
  const { token } = context;

  useEffect(() => {
      const timeout = setTimeout(() => {
          if (!input || input.length < 3) {
              setResults([]);
              return;
          }
          fetchSearch(input, token, setResults, setError, setLoading);
      }, 500);

      return () => clearTimeout(timeout);
  }, [input, token]);

  return (
    <div className={style.wrapper}>
        <input
            name="search"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search"
            className={style.searchbar + " roboto-normal"}
        />
      <Suggestions results={results} />
    </div>
  );
}

export default Searchbar;
