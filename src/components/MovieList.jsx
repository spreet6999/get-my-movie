// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies = [], year = 2012 }) => {
  return (
    <React.Fragment>
      <h2 className="text-slate-100 font-bold text-xl mb-2">{year}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies?.length
          ? movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : null}
      </div>
    </React.Fragment>
  );
};

export default MovieList;
