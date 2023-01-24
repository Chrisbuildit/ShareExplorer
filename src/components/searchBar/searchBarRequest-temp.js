

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
                        res.data.bestMatches.map(a => a.name)
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