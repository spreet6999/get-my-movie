// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies = [], year = 2012, genres = [] }) => {
  return (
    <React.Fragment>
      <h2 className="text-slate-100 font-bold text-xl mb-2">{year}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies?.length
          ? movies?.map((movie) => {
              const movieWithGenreNames = {
                ...movie,
                genres: movie.genre_ids
                  .map((id) => genres.find((item) => item.id === id))
                  .filter((item) => item),
              };
              return <MovieCard key={movie.id} movie={movieWithGenreNames} />;
            })
          : null}
      </div>
    </React.Fragment>
  );
};

export default MovieList;
