import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([""])
    const [isMatch, setIsMatch] = useState(true);
    const navigate = useNavigate();

    let match = searchResults.find(item => item.symbol === query.toUpperCase());

    function handleClick() {
        if(match) {
        navigate(`/searchResults/${query}`)
        } else {
        setIsMatch(false);
        }
        setQuery("")
    }

    function navigation() {
            setIsMatch(true);
            setQuery("")
            navigate("/SearchPage")
        }

        //Function doesn't work. Refreshes after loading
    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleClick();
        }
    }

    function abort() {
        setQuery("")
        setIsMatch(true);
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
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_API_KEY}`
                )
                    const hintArray = []
                    result.data.bestMatches.map((a) => {
                        return hintArray.push({symbol: a["1. symbol"], name: a["2. name"]})
                    });
                    setSearchResults(hintArray);
                    // console.log(searchResults);
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
                  // onKeyUp={keyPressCheck}
                  placeholder="Type a company name or symbol"
                  autoComplete="off"
              />
            <div className="Warning">
                  <p>{query.length > 2 ?
                      <b>Type the symbol of the correct option to perform a search</b>
                    : query && <b>Type a minimum of three characters</b>
                  }
                  </p>
                {!isMatch &&
                  <>
                      <p><b>The symbol you entered is incorrect.</b></p>
                      <p><b>Type the company name to see the correct symbol.</b></p>
                  </>
                }
            </div>
              <ul>
                {query.length > 2 && searchResults.map((post) => {
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
