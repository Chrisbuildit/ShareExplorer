import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from "axios";
import AsyncSelect from 'react-select/async';

const apiKey = 'Q577X5CIYDHZEQY7';

function SearchBar({ setCompanyHandler }, {data}) {
    const [query, setQuery] = useState('');
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
                });
        }, 300);
        setInputTimer(timeout);
    };

    return (
        <>
      <span className={ data? "searchbar" : "searchbarTop"}>
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
        </>
    );
}

export default SearchBar;
