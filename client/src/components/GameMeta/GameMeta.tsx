import MetaData from "./MetaData.tsx";
import MetaRating from "./MetaRating.tsx";

type GameMeta = {
    rating: number;
    releaseDate: string;
    genre: string;
    platform: string;
}

function GameMeta({ rating, releaseDate, genre, platform }: GameMeta) {


    return (
        <div>
            <MetaRating rating={rating} />
            <MetaData title="Release Date" value={releaseDate} />
            <MetaData title="Genre" value={genre} />
            <MetaData title="Platform" value={platform} />
        </div>
    );
}

export default GameMeta;