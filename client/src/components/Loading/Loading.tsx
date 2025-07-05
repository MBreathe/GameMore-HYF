import { PulseLoader } from "react-spinners";
import style from "./Loading.module.css";

function Loading() {
  return (
    <div className={style.loadingContainer}>
      <PulseLoader size={30} color="var(--accent-color)" />
    </div>
  );
}

export default Loading;
