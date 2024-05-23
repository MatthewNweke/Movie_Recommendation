import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./components/redux/actions/movieActions"; // Assuming you have this action creator

import "./App.css";
import "./style/navbar.css";
import Cards from "./components/Cards";
import logo from "./assets/logo.png";

function App() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    
  }, [dispatch]);

  const handleSearch = async () => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=ac0f6066dac6b62088f80248468d7bfb&language=en-US&query=${query}`
        );
        dispatch({
          type: "FETCH_MOVIES",
          payload: response.data.results,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // If search query is empty, fetch popular movies again
      dispatch(fetchMovies());
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="App">
      <div className="navbar">
        <h2>Most Popular Movies</h2>
        <div className="searchDiv rounded-xl">
          <form onSubmit={handleSubmit}>
            <input
              className="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="  Search for a movie"
            />
            <button type="submit" className="search__btn">
              🔍
            </button>
          </form>
        </div>
      </div>
      <section className="gridContainer">
        {movies
          .filter((movie) => movie.original_title && movie.poster_path) // Filter out movies without title or poster
          .map((movie, index) => {
            return <Cards key={index} {...movie} />;
          })}
      </section>
    </div>
  );
}

export default App;
