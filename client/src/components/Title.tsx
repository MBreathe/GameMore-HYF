function Title({ text }: { text: string }) {
  return (
    <h1
      className="inter-bold"
      style={{
        marginBottom: "1rem",
      }}
    >
      {text}
    </h1>
  );
}

export default Title;
