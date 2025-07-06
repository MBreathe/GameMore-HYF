import {useEffect, useState, useContext, useMemo} from "react";
import Suggestions from "./Suggestions.tsx";
import style from "./Searchbar.module.css";
import { StatusContext } from "../../context/StatusContext.tsx";
import useFetch from "../../hooks/useFetch.ts";

function Searchbar() {
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");

    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("Searchbar must be used within a StatusContextProvider");
    }
    const { token } = context;

    useEffect(() => {
        const timeout = setTimeout(() =>
            setDebouncedInput(input), 500);
        return () => clearTimeout(timeout);
    }, [input]);

    const greenlight = token && debouncedInput.length > 3;
    const options = useMemo(() => (
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                query: debouncedInput.toLowerCase()
            })
        }
    ), [debouncedInput, token]);

    const { data, loading, error } = useFetch("http://localhost:3000/api/games/search", greenlight ? token : null, options);

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
      <Suggestions results={data} />
    </div>
  );
}

export default Searchbar;
