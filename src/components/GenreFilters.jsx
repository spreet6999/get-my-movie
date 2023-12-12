import React from "react";
import Chip from "./common/Chip";

const GenreFilter = ({
  genres = [],
  selectedGenres = [],
  onGenreChange = () => {},
}) => {
  return (
    <React.Fragment>
      <h2 className="text-slate-100 font-bold text-2xl mb-2">
        Filter by Genre
      </h2>
      <div
        onClick={(e) => {
          e.stopPropagation();
          // console.log(e.target);
          onGenreChange(parseInt(e?.target?.id));
        }}
        className="text-slate-100 flex gap-2 overflow-x-auto no-scrollbar mb-3 hover:cursor-pointer"
      >
        <Chip isSelected={selectedGenres.length === 0} value={-1}>
          All
        </Chip>
        {genres?.length
          ? genres.map((genre) => (
              <Chip
                key={genre.id}
                isSelected={selectedGenres?.includes(genre.id)}
                text={genre.name}
                value={genre.id}
              >
                {genre.name}
              </Chip>
            ))
          : null}
      </div>
    </React.Fragment>
  );
};

export default GenreFilter;
