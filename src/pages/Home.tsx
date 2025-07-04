import { useState } from "react";
import Loading from "../components/Loading/Loading.tsx";
import Searchbar from "../components/Searchbar/Searchbar.tsx";
import Title from "../components/Title.tsx";

function Home() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <>
        <Searchbar />
      <Title text="Most anticipated" />
      {loading && <Loading />}
        <Title text="Top rated" />
    </>
  );
}

export default Home;
