import React from 'react';

const Search = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <form className="search" onSubmit={onSearch}>
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
