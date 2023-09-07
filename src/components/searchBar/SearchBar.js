import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// import { uuid } from 'uuidv4'
import Select, { components, InputActionMeta } from 'react-select'
import SearchResults from "../../pages/searchResults/SearchResults";

function SearchBar() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [selection, setSelection] = useState()
    const [error, toggleError] = useState(false)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    function handleClick() {
        navigate(`/searchResults/${selection.valueOf().label}`)
        setQuery("")
    }

    const handleOnSearch = (string) => {
        setQuery(string);
        console.log(string)
    }

    const handleOnSelect = (value) => {
        setSelection(value)
        // navigate(`/searchResults/${value.label}`)
        setSearchResults([])
    }

    const handleOnChange = (selectedOption) => {
        // setSelection(selectedOption)
        // console.log(selection);
        navigate(`/searchResults`)
    }

    function abort() {
        setQuery("")
    }

    useEffect(() => {
    const fetchData = async (e) => {
        toggleError(false);
        setIsLoading(true);
        try {
            console.log("FETCHING RESULTS");
            const result = await
                axios.get(
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_API_KEY}`
                    // `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${query}`,
                    // 'accept: application/json','X-API-KEY: HyE5hYtoWh5QwPbmpzUVf6sposSaYEqV8BzQd8WD'
                )
                console.log(result);
                const hintArray = []
                result.data.bestMatches.map((a) => {
                    return hintArray.push({symbol: a["1. symbol"], name: a["2. name"]})
                });
                setSearchResults(hintArray);
                console.log(searchResults);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        setIsLoading(false);
    };
    if(Object.keys(query).length > 2) {
    void fetchData();
    }
    },[query]);

    const optionList = searchResults.map((share) => {
        return {label: share.symbol, value: share.name};
    })

    return (
        <>
    <form className="searchbar" /*onMouseLeave={abort}*/>
        <section>
            <Select
                // classNamePrefix="mySelect"
                options={optionList}
                inputValue={query}
                placeholder="Enter the name or symbol of the company"
                onInputChange={handleOnSearch}
                isSearchable={true}
                isClearable={true}
                isLoading={isLoading}
                filterOption={null}
                onChange={handleOnSelect}
                onFocus={handleOnChange}
                onMenuOpen={handleOnChange}
                value={selection}
                aria-label="Single select"
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
            />
            <div className="Warning">
                  <p>{query.length > 2 ?
                      <b>Type the symbol of the correct option to perform a search</b>
                    : query &&
                      <b>Type a minimum of three characters</b>
                  }
                  </p>
            </div>
            {error &&
                <p>You have exceeded the search limit of two searches per minute</p>
            }
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


const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minWidth: '300px',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
        whiteSpace: 'nowrap',
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
};

const formatOptionLabel = (value) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    flexGrow: '1',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            >
                {value.label}
            </div>
            <div style={{ textAlign: 'right', color: 'green' }}>
                {value.value}
            </div>
        </div>
    )
}