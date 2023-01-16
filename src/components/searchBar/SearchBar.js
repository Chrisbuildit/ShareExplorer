import React, { useState } from 'react';
import './SearchBar.css';
import axios from "axios";

const apiKey = 'Q577X5CIYDHZEQY7';

function SearchBar({ setCompanyHandler }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [inputTimer, setInputTimer] = useState(null);

    function handleClick() {
        setCompanyHandler(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setCompanyHandler(query);
        }
    }
    const handleInputChange = async (e) => {
        setQuery(e.target.value);
    clearTimeout(inputTimer);
    let timeout = setTimeout(() => {
        console.log("FETCHING RESULTS");
        axios
            .get(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${apiKey}`
            )
            .then((res) => {
                console.log(res.data);
                setSearchResults(res.data);
            });
    }, 300);
    setInputTimer(timeout);
};

    return (
      <>
      <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          onChange={handleInputChange}
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
    <div className='k'>
        <ul> {searchResults.map((searchResult) => {
            return (
            <li>{searchResult.name}</li>
        )})}
        </ul>
    </div>
    </>
    );
}

export default SearchBar;