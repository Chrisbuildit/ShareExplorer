import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ setCompanyHandler }) {
    const [query, setQuery] = useState('');

    function handleClick() {
        setCompanyHandler(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setCompanyHandler(query);
        }
    }

    return (
        <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={keyPressCheck}
          placeholder="Type the name or symbol of a company"
      />

      <button
          type="button"
          onClick={handleClick}
      >
        Search
      </button>
    </span>
    );
}

export default SearchBar;