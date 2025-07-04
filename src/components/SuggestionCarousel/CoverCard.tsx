import style from './SuggestionCarousel.module.css';

function CoverCard() {

    return (
        <div className={style.card}>
            <img className={style.favoriteImg} src="/heart/hollow-heart.png" alt="heart"/>
            <img className={style.cover} src="https://images.igdb.com/igdb/image/upload/t_720p/co9rwo.jpg" alt="game_aartwork"/>
            <h2 className="inter-medium">Grand Theft Auto VI</h2>
        </div>
    )
}

export default CoverCard;