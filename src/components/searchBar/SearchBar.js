import React, {useContext, useState} from 'react';
import './SearchBar.css';
import axios from "axios";
import {StateContext} from "../../context/StateContext";

const apiKey = 'Q577X5CIYDHZEQY7';


function SearchBar() {
    const [query, setQuery] = useState('');
    const [inputTimer, setInputTimer] = useState(null);
    const {setCompany} = useContext(StateContext);

    function handleClick() {
        setCompany(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setCompany(query);
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
      <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          onChange={handleInputChange}
          onKeyUp={keyPressCheck}
          placeholder="Type the symbol of a company"
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
