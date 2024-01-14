import React from "react";

function SearchBar({ value = "", onChange = () => {}, label = "Search" }) {
  // console.log("VALUE: ", value);
  return (
    <div className="relative h-full" data-te-input-wrapper-init>
      <input
        type="search"
        className="peer block h-full w-full rounded border border-1 border-white bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear text-white"
        id="get-my-movies-search"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
