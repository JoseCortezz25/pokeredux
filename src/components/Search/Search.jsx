import React from "react";
import './Search.css'

const Search = ({setSearch}) => {
  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search your Pokemon..."
        onChange={({ target }) => setSearch(target.value)}
      />
    </div>
  );
};

export default Search;
