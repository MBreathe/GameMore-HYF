import { useState } from "react";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import Loading from "../components/Loading/Loading.tsx";
import ScrollToTopButton from "../components/ScrollToTopButton.tsx";

function Home() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <>
      <Header />
      <h1 className="inter-bold" style={{ margin: "2rem" }}>
        Most anticipated
      </h1>
      {loading && <Loading />}
      <p style={{ marginBottom: "5000px" }}>Lorem ipsum</p>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default Home;
