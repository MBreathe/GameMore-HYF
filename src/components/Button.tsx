function Button({ value, onClick }: { value: string; onClick?: () => void }) {
  return (
    <button className="roboto-normal" onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
