import Button from "../Button.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const [symbol, setSymbol] = useState("★");

  return (
    <footer className="footer">
      <Button
        value={symbol}
        onClick={() => setSymbol(symbol === "★" ? "☆" : "★")}
      />
      <Link to="/about">
        <Button value="About" />
      </Link>
      <Link to="/contact">
        <Button value="Contact" />
      </Link>
    </footer>
  );
}

export default Footer;
