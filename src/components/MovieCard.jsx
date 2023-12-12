import React from "react";

const MovieCard = React.forwardRef(({ movie, lazyLoadImg = false }, ref) => {
  const { title, poster_path, genres, overview } = movie;

  // console.log("MOVIE: ", movie);

  const genreString = genres
    ? genres.map((genre) => genre.name).join(" • ")
    : null;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        loading={lazyLoadImg ? "lazy" : "eager"}
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {genreString ? (
          <span
            title={genreString}
            className="text-white inline font-bold text-sm"
          >
            {genreString}
          </span>
        ) : null}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm h-32 overflow-y-auto no-scrollbar">
          {overview}
        </p>
      </div>
    </div>
  );
});

export default MovieCard;
