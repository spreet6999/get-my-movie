// MovieList.js
import React, { memo } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies = [],
  latestFetchedYear = 2012,
  intersectionRef,
}) => {
  console.log("Re-rendered", latestFetchedYear);

  return (
    <React.Fragment>
      {movies?.length
        ? movies?.map((movieObj) =>
            renderMoviesSection(
              movieObj.movies,
              movieObj.year,
              intersectionRef,
              latestFetchedYear
            )
          )
        : null}
    </React.Fragment>
  );
};

export default memo(MovieList);

function renderMoviesSection(
  movies = [],
  year = 2012,
  intersectionRef = null,
  latestFetchedYear = 2012
) {
  if (movies.length === 0) {
    return (
      <h2 className="text-center text-slate-100 font-bold text-2xl my-2">
        No Movies To Show
      </h2>
    );
  }
  // console.log("Inside Render Movies Section: ", year);
  return (
    <React.Fragment>
      <h2 className="text-slate-100 font-bold text-2xl my-2">{year}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={`${movie.id}__${index}__${movie?.release_date}`}
              movie={movie}
              loading={index > 5}
            />
          );
        })}
        {latestFetchedYear === year ? (
          <div ref={intersectionRef} id={`movie-${movies.length - 1}`} />
        ) : null}
      </div>
    </React.Fragment>
  );
}
