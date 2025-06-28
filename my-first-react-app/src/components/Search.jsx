import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />

            <input
                type="text"
                placeholder="Search through thounsands of movie"
                value={searchTerm}
                onchange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  );
};

export default Search
