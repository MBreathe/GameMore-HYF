import Button from "../Button.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Header.module.css";

function Header() {
  const [src, setSrc] = useState("/logo/Logo-light.png");

  const logoLight = "/logo/Logo-light.png";
  const logoDark = "/logo/Logo-dark.png";

  return (
    <div className={style.header}>
      <Link to="/">
        <img
          className={style.logo}
          src={src}
          onMouseOver={() => setSrc(logoDark)}
          onMouseOut={() => setSrc(logoLight)}
          alt="logo"
        />
      </Link>
      <Link to="/favorites">
        <Button value="Favorites" />
      </Link>
    </div>
  );
}

export default Header;
