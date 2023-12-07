import React from "react";

const MovieCard = ({ movie }) => {
  const { title, poster_path, genres, overview } = movie;

  const genreString = genres
    ? genres.map((genre) => genre.name).join(" • ")
    : null;

  return (
    // <div className="relative group mb-2">
    //   <div className="flex flex-col p-4 mb-4 bg-white rounded-sm shadow-md overflow-hidden group-hover:transform group-hover:scale-110 group-hover:z-10 transition-transform">
    //     <img
    //       src={`https://image.tmdb.org/t/p/w500${poster_path}`}
    //       alt={title}
    //       className="w-full h-48 object-cover mb-2 rounded-md"
    //     />
    //     <h2 className="text-xl h-8 truncate font-bold mb-2" title={title}>
    //       {title}
    //     </h2>
    //     {genreString ? (
    //       <span
    //         title={genreString}
    //         className="text-gray-600 inline font-bold text-sm truncate"
    //       >
    //         {genreString}
    //       </span>
    //     ) : null}
    //     <p className="text-gray-700 mb-2">Cast: {cast}</p>
    //     <p className="text-gray-700 mb-2">Director: {director}</p>
    //     <p
    //       className="text-gray-800 h-32 text-sm overflow-y-auto no-scrollbar"
    //       title={overview}
    //     >
    //       {overview}
    //     </p>
    //   </div>
    // </div>
    <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
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
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm h-32 overflow-y-auto no-scrollbar">
          {overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
