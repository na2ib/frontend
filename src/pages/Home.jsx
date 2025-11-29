import MovieCard from "../components/MovieCard.jsx";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { 
    searchMovies as searchManga, 
    getPopularMovies as getTopManga 
} from "../services/api.js"; 

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [manga, setManga] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadTopManga = async () => {
      try {
        const topManga = await getTopManga(); 
        setManga(topManga);
      } catch (err) {
        console.log(err);
        setError("Failed to load top manga...");
      } finally {
        setLoading(false);
      }
    };
    loadTopManga();
  }, []);

  const handleSearch = async(e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchManga(searchQuery)
        setManga(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search manga...") 
    } finally {
        setLoading(false)
    }
  };
  
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for manga..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {manga.map((item) => ( 
            <MovieCard movie={item} key={item.mal_id} /> 
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;