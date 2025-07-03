import Button from "../Button.tsx";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.buttonContainer}>
        <Link to="/about">
          <Button value="About" />
        </Link>
        <Link to="/contact">
          <Button value="Contact" />
        </Link>
      </div>
      <div className={style.textContainer}>
        <p className="roboto-normal">© 2025 Game More</p>
      </div>
    </footer>
  );
}

export default Footer;
