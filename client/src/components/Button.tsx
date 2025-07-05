import type { JSX } from "react";

function Button({
  value,
  onClick,
  style,
  onMouseOver,
  onMouseOut,
    type
}: {
  value: string | JSX.Element;
  onClick?: () => void;
  style?: object;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}) {
  return (
    <button
      className={"roboto-normal"}
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      type={type}
    >
      {value}
    </button>
  );
}

export default Button;
