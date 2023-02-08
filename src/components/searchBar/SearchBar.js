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
        try {
            console.log("FETCHING RESULTS");
            const result = await
                axios.get(
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${apiKey}`
                )
                    setQuery(e.target.value);
                    const hintArray = []
                    result.data.bestMatches.map((a) => {
                        return hintArray.push({symbol: a["1. symbol"], name: a["2. name"]})
                    });
                    setSearchResults(hintArray);
                    console.log(result.data);
                } catch (e) {
                        console.error(e);
                        toggleError(true);
                    }
    };

    return (
        <>
    <form className="searchbar" onMouseLeave={abort}>
        <section>
              <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={handleInputChange}
                  onClick={keyPressCheck}
                  placeholder="Type the name or symbol of a company"
                  autoComplete="off"
              />
              <p className="Warning" >{query &&<b>Type the symbol of the correct option to perform a search</b>}</p>
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
    </form>
        </>
    );
}

export default SearchBar;
