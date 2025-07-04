import style from './SuggestionCarousel.module.css';

function NavDots() {

    return (
        <div className={style.navDots}>
            <div className={style.filledDot}></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default NavDots;