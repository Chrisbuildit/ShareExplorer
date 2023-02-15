import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const apiKey = 'Q577X5CIYDHZEQY7';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([""])
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate(`/SearchResults/${query}`)
        // setQuery("")
    }

    function navigation(e) {
            e.preventDefault();
            setQuery("")
        }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            navigate(`/SearchResults/${query}`)
            // setQuery("")
        }
    }

    function abort() {
        setQuery("")
    }

    function update(e) {
        setQuery(e.target.value);
        setSearchResults([""]);
    }

    useEffect(() => {
    const fetchData = async (e) => {
        try {
            console.log("FETCHING RESULTS");
            const result = await
                axios.get(
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
                )
                    const hintArray = []
                    result.data.bestMatches.map((a) => {
                        return hintArray.push({symbol: a["1. symbol"], name: a["2. name"]})
                    });
                    setSearchResults(hintArray);
                    console.log(result.data);
                } catch (e) {
                        console.error(e);
                    }
    };
    if(Object.keys(query).length > 2) {
    void fetchData();
    }
    },[query]);

    return (
        <>
    <form className="searchbar" onMouseLeave={abort}>
        <section>
              <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={update}
                  onClick={navigation}
                  onKeyUp={keyPressCheck}
                  placeholder="Type a company name or symbol"
                  autoComplete="off"
              />
              <p className="Warning" >{Object.keys(query).length > 2 ?
                  <b>Type the symbol of the correct option to perform a search</b>
                : query && <b>Type a minimum of three characters</b>}</p>
              <ul>
                {Object.keys(query).length > 2 && searchResults.map((post) => {
                    return <li key={post.symbol}>
                        {post.symbol +", "+ post.name}
                    </li>
                })}
              </ul>
        </section>
      <button
          type="button"
          onClick={handleClick}
      >
        Search
      </button>
    </form>
        </>
    );
}

export default SearchBar;
