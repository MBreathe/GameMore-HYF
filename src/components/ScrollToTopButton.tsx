import { useState, useEffect } from "react";
import Button from "./Button.tsx";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      window.addEventListener("scroll", () =>
        window.scrollY > 300 ? setVisible(true) : setVisible(false),
      );
    };

    toggleVisibility();
    return () => removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <Button
        value="Back to top"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "2rem",
          zIndex: 1,
        }}
      />
    )
  );
}

export default ScrollToTopButton;
