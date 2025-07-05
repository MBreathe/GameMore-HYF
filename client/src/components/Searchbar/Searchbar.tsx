import {useEffect, useState, useContext} from "react";
import Suggestions from "./Suggestions.tsx";
import style from "./Searchbar.module.css";
import * as React from "react";
import Button from "../Button.tsx";
import { StatusContext } from "../../context/StatusContext.tsx";
import fetchSearch from "../../services/fetchSearch.ts";

function Searchbar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const context = useContext(StatusContext);
  if (!context) {
      throw new Error("Searchbar must be used within a StatusContextProvider");
  }
  const { token, setError } = context;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // setInput(""); still have to think about this logic
  }

  useEffect(() => {
      fetchSearch(input, setError, setResults, setSearching, token);
  }, [input, setError, setResults, setSearching, token]);

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                name="search"
                type="text"
                onChange={handleInputChange}
                value={input}
                placeholder="Search"
                className={style.searchbar + " roboto-normal"}
            />
            <Button value="Search" type="submit" />
        </form>
      <Suggestions results={results} />
    </div>
  );
}

export default Searchbar;
