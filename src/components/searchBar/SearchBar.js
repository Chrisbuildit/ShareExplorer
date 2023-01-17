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
                setSearchResults(res.data.bestMatches);
                console.log(searchResults);
            });
    }, 300);
    setInputTimer(timeout);
};

    return (
      <>
      <span className="searchbar">
          <form>
              <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={handleInputChange}
                  onKeyUp={keyPressCheck}
                  placeholder="Type the name or symbol of a company"
                  autoComplete="off"
              />
              <ul className='auto-complete'> {searchResults && searchResults.map((searchResult) => {
                  return (
                      <li key={searchResult.symbol}>{searchResult.name}</li>
                  )})}
              </ul>
          </form>
          <button
              type="button"
              onClick={handleClick}
          >
            Search
          </button>
    </span>
    </>
    );
}

export default SearchBar;