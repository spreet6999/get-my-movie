// MovieCard.js
import React from "react";

const MovieCard = ({ movie }) => {
  const { title, poster_path, genre, cast, director, description } = movie;
  // title, image, genre, cast, director, and a short description

  return (
    <div className="flex flex-col items-center p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow hover:border-1 hover:cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{genre}</p>
      <p className="text-gray-700 mb-2">Cast: {cast}</p>
      <p className="text-gray-700 mb-2">Director: {director}</p>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};

export default MovieCard;
