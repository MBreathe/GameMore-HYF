import type { JSX } from "react";

function Button({
  value,
  onClick,
  style,
  onMouseOver,
  onMouseOut,
}: {
  value: string | JSX.Element;
  onClick?: () => void;
  style?: object;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}) {
  return (
    <button
      className={"roboto-normal"}
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {value}
    </button>
  );
}

export default Button;
