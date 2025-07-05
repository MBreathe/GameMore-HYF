import CoverCard from "./CoverCard.tsx";
import NavDots from "./NavDots.tsx";
import style from "./SuggestionCarousel.module.css";

function SuggestionCarousel() {
    return (
        <div className={style.wrapper}>
            <div className={style.carousel}>
                <CoverCard />
                <CoverCard />
                <CoverCard />
                <CoverCard />
            </div>
            <NavDots />
        </div>
    )
}

export default SuggestionCarousel;