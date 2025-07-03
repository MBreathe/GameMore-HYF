import Button from "../Button.tsx";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
  return (
    <div className={style.header}>
      <Link to="/">
        <img className={style.logo} src="/logo/Logo-light.png" alt="logo" />
      </Link>
      <Link to="/favorites">
        <Button value="Favorites" />
      </Link>
    </div>
  );
}

export default Header;
