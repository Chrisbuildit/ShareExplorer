import React, { useState } from 'react';
import './SearchBar.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const apiKey = 'Q577X5CIYDHZEQY7';

function SearchBar({setCompanyHandler}) {
    const [query, setQuery] = useState('');
    const [inputTimer, setInputTimer] = useState(null);
    const [searchResults, setSearchResults] = useState([""])
    const navigate = useNavigate();
    // const {setCompany} = useContext(StateContext);

    function handleClick() {
        setCompanyHandler(query);
        navigate("/SearchResults")
        setQuery("")
    }

    function keyPressCheck(e) {
            setCompanyHandler("")
            navigate("/SearchResults")
        }

    function abort() {
        setQuery("")
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
                    res.data.bestMatches.map((a) => {
                        return hintArray.push({symbol: a["1. symbol"], name: a["2. name"]})
                    });
                    setSearchResults(hintArray);
                    console.log(res.data);
                });
        }, 300);
        setInputTimer(timeout);
    };

    return (
        <>
    <span className="searchbar" >
        <section>
              <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={handleInputChange}
                  onClick={keyPressCheck}
                  placeholder="Type the symbol of a company"
                  autoComplete="off"
              />
              <ul>
                {query && searchResults.map((post) => {
                    return <li key={post.id}>
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
    </span>
        </>
    );
}

export default SearchBar;
