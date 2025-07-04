import React, { useState } from "react";
import Suggestions from "./Suggestions.tsx";
import style from "./Searchbar.module.css";

function Searchbar() {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowercase = e.target.value.toLowerCase();
    setInput(lowercase);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        value={input}
        placeholder="Search"
        className={style.searchbar + " roboto-normal"}
      />
      <Suggestions input={input} />
    </div>
  );
}

export default Searchbar;
