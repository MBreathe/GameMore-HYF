import { useState } from "react";
import Suggestions from "./Suggestions.tsx";
import style from "./Searchbar.module.css";

function Searchbar() {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Search"
        className={style.searchbar + " roboto-normal"}
      />
      <Suggestions input={input} />
    </div>
  );
}

export default Searchbar;
