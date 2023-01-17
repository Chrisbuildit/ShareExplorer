import React, { useState } from 'react';
import './SearchBar.css';
import axios from "axios";
import { Hint } from 'react-autocomplete-hint';

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
                const hintArray = []
                res.data.bestMatches.map(a => hintArray.push(a.name))
                setSearchResults(hintArray);
                console.log(hintArray);
            });
    }, 300);
    setInputTimer(timeout);
};

    return (
      <>
        <span>
          <div className="searchbar">
              <h5>Try typing these words</h5>
              <code>{`[${searchResults.toString()}]`}</code>
              <br/>
              <br/>
              <br/>
              <Hint options={searchResults} allowTabFill>
                  <input
                         type="text"
                         name="search"
                         value={query}
                         onChange={handleInputChange}
                         onKeyUp={keyPressCheck}
                         placeholder="Type the name or symbol of a company"
                         autoComplete="off"
                  />
              </Hint>
          </div>
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