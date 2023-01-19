import React, { useState } from 'react';
import './SearchBar.css';
import axios from "axios";
import AsyncSelect from 'react-select/async';

const apiKey = 'Q577X5CIYDHZEQY7';

function SearchBar({ setCompanyHandler }) {
    const [query, setQuery] = useState('');
    const [inputValue, setValue] = useState('');

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setQuery(value);
    }

    function handleClick() {
        setCompanyHandler(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setCompanyHandler(query);
        }
    }
    const fetchData = () => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("FETCHING RESULTS");
        axios
            .get(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${apiKey}`
            )
            .then((res) => {
                res.data.bestMatches.map(a => a.name)
            });
            }, 300);
    })
    };

    return (
      <>
        <span className="searchbar">
                  <AsyncSelect className='t'
                         cacheOptions
                         isMulti
                         defaultOptions
                         value={query}
                         onInputChange={handleInputChange}
                         onChange={handleChange}
                         onKeyUp={keyPressCheck}
                         placeholder="Type the name or symbol of a company"
                         loadOptions={fetchData}
                  />
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