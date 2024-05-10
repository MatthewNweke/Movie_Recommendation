import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import "./style/navbar.css";
import Cards from "./components/Cards";
import logo from "./assets/logo.png";

function App() {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetching popular movies initially
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=ac0f6066dac6b62088f80248468d7bfb&language=en-US"
      )
      .then((res) => {
        setCards(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    if (query.length > 0) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=ac0f6066dac6b62088f80248468d7bfb&language=en-US&query=${query}`
        )
        .then((res) => {
          setCards(res.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If search query is empty, fetch popular movies again
      fetchPopularMovies();
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
    <div className="App" id="blur">
      <div>
        <div className="navbar">
          <h2 className="text">Most Popular Movies</h2>{" "}
          <div className="searchDiv rounded-xl ">
            <form onSubmit={handleSubmit} max>
              <input
                className="search max-sm:hidden"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="  Search for a movie"
              />
               <button type="submit" className="search__btn">🔍</button>
            </form>
           
          </div>
        </div>
        <div className="rectangle"></div>
      </div>

      <section className="gridContainer">
        {cards.map((movie, index) => {
          return <Cards key={index} {...movie} />;
        })}
      </section>
    </div>
  );
}

export default App;
