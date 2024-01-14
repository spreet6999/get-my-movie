// App.js
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

//* Import Components/Utils
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GenreFilters";
import NavBar from "./components/common/NavBar";
import LineLoader from "./components/common/LineLoader";
import Loader from "./components/common/Loader";
import { fetchGenres, fetchMovies } from "./api/services";
import { unwrapMovies, debounce } from "./utils/utils";

const App = () => {
  const [movies, setMovies] = useState({
    isLoading: false,
    result: [],
    isError: false,
    message: "",
  });
  const [genres, setGenres] = useState({
    isLoading: false,
    result: [],
    isError: false,
    message: "",
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);
  const [searchValue, setSearchValue] = useState("");

  const isInitialLoadRef = useRef(true);

  const observer = useRef();
  const lastMovieRef = useCallback(
    (node) => {
      if (movies?.isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // console.log("Reached last movie!");
          if (currentYear < new Date().getFullYear())
            setCurrentYear((prevState) => prevState + 1);
        }
      });

      if (node) observer.current.observe(node);
      if (currentYear === 2023 && node) observer.current.unobserve(node);
    },
    [movies?.isLoading, currentYear]
  );

  async function fetchMoreMovies(currentYear = 2012, searchValue = "") {
    try {
      setMovies((prevState) =>
        Boolean(searchValue.length === 0)
          ? { ...prevState, isLoading: true }
          : {
              isLoading: true,
              result: [],
              isError: false,
              message: "",
            }
      );

      const moviesResp = await fetchMovies(currentYear, searchValue);
      setMovies((prevState) => ({
        result: [
          ...prevState?.result,
          ...[unwrapMovies(moviesResp?.data.results, currentYear)],
        ],
        isLoading: false,
        isError: false,
        message: "",
      }));
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;

      async function fetchData() {
        try {
          setMovies((prevState) => ({ ...prevState, isLoading: true }));
          setGenres((prevState) => ({ ...prevState, isLoading: true }));

          const [moviesResp, genresResp] = await Promise.allSettled([
            fetchMovies(currentYear),
            fetchGenres(),
          ]);

          if (moviesResp.status === "fulfilled") {
            setMovies({
              result: [unwrapMovies(moviesResp.value.data.results)],
              isLoading: false,
              isError: false,
              message: "",
            });
          } else {
            setMovies({ result: [], isLoading: false });
            throw moviesResp.reason;
          }

          if (genresResp.status === "fulfilled") {
            setGenres({
              result: genresResp.value.data.genres,
              isLoading: false,
              isError: false,
              message: "",
            });
          } else {
            throw genresResp.reason;
          }
        } catch (error) {
          console.log("ERROR: ", error.message);
        }
      }

      fetchData();
      return;
    }
    // console.log(isInitialLoadRef.current);
    if (!isInitialLoadRef.current) {
      // console.log(isInitialLoadRef.current);
      fetchMoreMovies(currentYear);
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

  const debounceFetchMoreMovies = useCallback(debounce(fetchMoreMovies), [
    fetchMoreMovies,
  ]);

  const handleSearchValue = (e) => {
    // console.log("VALUE: ", e.target.value);
    setSearchValue(e.target.value);
    debounceFetchMoreMovies(2012, e.target.value);
  };

  const filteredMovies = useMemo(
    () =>
      selectedGenres.length > 0
        ? movies?.result.map((movieObj) => ({
            // const targetValues = new Set(selectedGenres);
            ...movieObj,
            movies: movieObj?.movies.filter((movie) => {
              const allValues = new Set(movie.genre_ids);

              return selectedGenres.every((id) => allValues.has(id));
            }),
          }))
        : movies?.result,
    [movies, selectedGenres]
  );

  const moviesWithGenres = useMemo(
    () =>
      filteredMovies.map((movieObj) => ({
        ...movieObj,
        movies: movieObj?.movies.map((movie) => ({
          ...movie,
          genres: movie.genre_ids
            .map((id) => genres?.result?.find((item) => item.id === id))
            .filter((item) => item),
        })),
      })),
    [filteredMovies, genres]
  );

  // console.log("MOVIES: ", moviesWithGenres);
  // console.log("GENRES: ", genres);
  // console.log("SELECTED GENRES: ", selectedGenres);
  // console.log("CURRENT YEAR: ", currentYear);
  // console.log("filteredMovies: ", filteredMovies);
  // console.log("SearchValue: ", searchValue);

  return (
    <div className="dark:bg-slate-900 h-full mx-auto">
      <NavBar
        searchbarProps={{
          value: searchValue,
          onChange: handleSearchValue,
          label: "Search Movies",
        }}
      />
      <div className="dark:bg-slate-900 h-full px-6 py-8 ring-1 ring-slate-900/5 shadow-xl container mx-auto pt-[6.5rem]">
        {genres?.isLoading ? (
          <LineLoader />
        ) : (
          <GenreFilter
            genres={genres.result}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
          />
        )}

        {movies?.isLoading && movies?.result.length === 0 ? (
          <Loader />
        ) : (
          <MovieList
            movies={moviesWithGenres}
            latestFetchedYear={currentYear}
            isInitialLoadRef={isInitialLoadRef}
            intersectionRef={lastMovieRef}
          />
        )}

        {movies?.isLoading && movies?.result?.length > 0 ? (
          <p className="text-center text-slate-100 font-bold text-lg">
            Loading...
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default App;
