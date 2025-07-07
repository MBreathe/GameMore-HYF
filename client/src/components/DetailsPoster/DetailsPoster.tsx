import useFetch from "../../hooks/useFetch";

function DetailsPoster({ coverID }: { coverID: number }) {
  if (!coverID) {
    return null;
  }

  return <img src="" alt="Poster" />;
}

export default DetailsPoster;
