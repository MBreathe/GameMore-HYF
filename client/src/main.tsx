import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import StatusContextProvider from "./context/StatusContext.tsx";
import FavoritesContextProvider from "./context/FavoritesContext.tsx";
import Header from "./components/Header/Header.tsx";
import ScrollToTopButton from "./components/ScrollToTopButton.tsx";
import Favorites from "./pages/Favorites.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StatusContextProvider>
        <FavoritesContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <ScrollToTopButton />
        </FavoritesContextProvider>
      </StatusContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
