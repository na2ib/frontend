import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext" 

function MovieCard({ movie }) {
    const mangaId = movie.mal_id; 

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(mangaId) 

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(mangaId)
        else addToFavorites(movie) 
    }

    const publicationYear = movie.published?.from 
        ? new Date(movie.published.from).getFullYear()
        : "N/A";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.images?.jpg?.image_url} 
          alt={movie.title} 
        />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            ❤
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3> 
        <p>{publicationYear}</p> 
      </div>
    </div>
  );
}

export default MovieCard;