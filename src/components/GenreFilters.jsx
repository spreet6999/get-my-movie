import React from "react";
import Chip from "./common/Chip";

const GenreFilter = ({
  genres = [],
  selectedGenres = [],
  onGenreChange = () => {},
}) => {
  return (
    <div className="fixed bg-inherit w-[24rem] sm:w-[23rem] md:w-[45rem] lg:w-[61rem] xl:w-[77rem] 2xl:w-[93rem]">
      <h2 className="text-slate-100 font-bold text-2xl mb-2">
        Filter by Genre
      </h2>
      <div
        onClick={(e) => {
          e.stopPropagation();
          // console.log(e.target);
          onGenreChange(parseInt(e?.target?.id));
        }}
        className="text-slate-100 flex gap-2 w-full overflow-x-auto no-scrollbar mb-3 hover:cursor-pointer"
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
    </div>
  );
};

export default GenreFilter;
