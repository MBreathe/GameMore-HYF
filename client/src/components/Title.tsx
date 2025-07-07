function Title({ text }: { text: string | undefined }) {
  if (!text) return null;

  return <h1 className="inter-bold">{text}</h1>;
}

export default Title;
