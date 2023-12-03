// App.js
import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GenreFilters";
import { fetchGenres, fetchMovies } from "./api/services";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);

  useEffect(() => {
    async function fetchData() {
      const respMovies = await fetchMovies(currentYear);
      const respGenres = await fetchGenres();
      if (respMovies) setMovies(respMovies);
      else setMovies([]);
      if (respGenres) setGenres(respGenres);
      else setGenres([]);
    }
    fetchData();
    // setMovies(fetchMovies(currentYear));
    // setGenres(fetchGenres());

    // fetchMovies(currentYear);
    // fetchGenres();
  }, [currentYear]);

  const handleGenreChange = (genreId) => {
    // Additional logic to update selected genres and fetch filtered movies.
    setSelectedGenres((prevState) => {
      if (selectedGenres.includes(genreId)) {
        return prevState.filter((id) => id !== genreId);
      }
      return [...prevState, genreId];
    });
  };

  // console.log("MOVIES: ", movies);
  // console.log("GENRES: ", genres);
  // console.log("SELECTED GENRES: ", selectedGenres);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie App</h1>
      <GenreFilter
        genres={genres}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
      />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
