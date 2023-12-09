// App.js
import React, { useState, useEffect, useRef } from "react";
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GenreFilters";
import { fetchGenres, fetchMovies } from "./api/services";
import NavBar from "./components/common/NavBar";
import LineLoader from "./components/common/LineLoader";

const App = () => {
  const [movies, setMovies] = useState({ isLoading: false, result: [] });
  const [genres, setGenres] = useState({ isLoading: false, result: [] });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);

  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      async function fetchData() {
        try {
          setMovies({ ...movies, isLoading: true });
          setGenres({ ...genres, isLoading: true });

          const respMovieAndGenres = await Promise.allSettled([
            fetchMovies(currentYear),
            fetchGenres(),
          ]);
          if (respMovieAndGenres[0].status === "fulfilled") {
            const moviesResp = respMovieAndGenres[0].value;
            setMovies({ result: moviesResp.data.results, isLoading: false });
          } else {
            setMovies({ result: [], isLoading: false });
            throw respMovieAndGenres[0].reason;
          }
          if (respMovieAndGenres[1].status === "fulfilled") {
            const genresResp = respMovieAndGenres[1].value;
            setGenres({
              result: genresResp.data.genres,
              isLoading: false,
            });
          } else {
            setGenres({ result: [], isLoading: false });
            throw respMovieAndGenres[1].reason;
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchData();
      return;
    }
  }, [currentYear]);

  const handleGenreChange = (genreId) => {
    // Additional logic to update selected genres and fetch filtered movies.
    setSelectedGenres((prevState) => {
      if (selectedGenres.includes(genreId)) {
        return prevState.filter((id) => id !== genreId);
      }

      return genreId ? [...prevState, genreId] : prevState;
    });
  };

  console.log("MOVIES: ", movies);
  console.log("GENRES: ", genres);
  console.log("SELECTED GENRES: ", selectedGenres);

  return (
    <div className="dark:bg-slate-900 h-full mx-auto">
      <NavBar />
      <div className="dark:bg-slate-900 h-full px-6 py-8 ring-1 ring-slate-900/5 shadow-xl container mx-auto pt-28">
        {genres.isLoading ? (
          <LineLoader />
        ) : (
          <GenreFilter
            genres={genres.result}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
          />
        )}
        <MovieList
          movies={movies.result}
          genres={genres.result}
          year={currentYear}
        />
      </div>
    </div>
  );
};

export default App;
