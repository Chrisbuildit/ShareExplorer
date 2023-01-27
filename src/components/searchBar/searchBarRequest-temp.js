import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from "axios";
import AsyncSelect from 'react-select/async';

const apiKey = 'Q577X5CIYDHZEQY7';

function SearchBar({ setCompanyHandler, data }) {
    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setValue] = useState('');
    const [array, setArray] = useState([""]);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    function handleClick() {
        setCompanyHandler(selectedValue);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setCompanyHandler(selectedValue);
        }
    }


    async function fetchData() {
        console.log("FETCHING RESULTS");
        try {
            const result = await axios
                .get(
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${apiKey}`
                );
            const arr = [];
            // result.data.bestMatches.map((a) => {
            //     return (a["2. name"])
            // });
            result.data.bestMatches.map((a) => {
                console.log(a["2. name"])
                // return a["2. name"]
                return arr.push({name: a["2. name"]})
            });
            setArray(arr);
            // console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <>
        <span className={ data? "searchbar": "searchbarTop"}>
                  <AsyncSelect className='Select'
                               cacheOptions
                               defaultOptions
                               value={selectedValue}
                               onInputChange={handleInputChange}
                               onChange={handleChange}
                               onKeyUp={keyPressCheck}
                               placeholder="Type the name or symbol of a company"
                               options={array}
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

/*function SearchBar({ setCompanyHandler }) {
    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setValue] = useState('');

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    function handleClick() {
        setCompanyHandler(selectedValue);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setCompanyHandler(selectedValue);
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
                        res.data.bestMatches.map(a => a["2. name"])
                    });
            }, 300);
        })
    };

    return (
        <>
        <span className="searchbar">
                  <AsyncSelect className='Select'
                               cacheOptions
                               defaultOptions
                               value={selectedValue}
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

 */