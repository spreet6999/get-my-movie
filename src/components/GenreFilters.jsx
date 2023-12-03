// GenreFilter.js
import React from "react";

const GenreFilter = ({ genres, selectedGenres, onGenreChange }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <span className="font-bold">Filter by Genre:</span>
      {genres?.length
        ? genres.map((genre) => (
            <label key={genre.id} className="cursor-pointer">
              <input
                type="checkbox"
                value={genre.id}
                checked={selectedGenres.includes(genre.id)}
                onChange={() => onGenreChange(genre.id)}
              />
              <span className="ml-2">{genre.name}</span>
            </label>
          ))
        : null}
    </div>
  );
};

export default GenreFilter;
