import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import './SearchResults.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";
import {SymbolOverview, TechnicalAnalysis} from "react-ts-tradingview-widget";

function SearchResults() {

    const [companyOverview, setCompanyOverview] = useState({});
    const [error, toggleError] = useState(false)
    const keyName = "lastSearchCompany"
    const [pastSearches, setPastSearches] = useState(() => {
        const parsedItem = JSON.parse(localStorage.getItem(keyName));
        return parsedItem || []
    })

    const {isAuth, user} = useContext(AuthContext);
    // Get the userId param from the URL.
    let {companyId} = useParams();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        async function fetchData() {
            toggleError(false);
            try {
                const response = await
                    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${process.env.REACT_APP_API_KEY}`);
                if(user) {
                response.data.Date = Date.now();
                response.data.User = user.id;}
                setCompanyOverview(response.data);
                console.log(pastSearches);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }
        if (companyId) {
            void fetchData();}
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if(companyOverview.Symbol && isAuth)
            if(pastSearches.length < 20) {
            setPastSearches([...pastSearches, companyOverview]);
                console.log('<20')
        }
            else {pastSearches &&
            setPastSearches(pastSearches.shift());
            setPastSearches([...pastSearches, companyOverview]);
                console.log('>20')
        }
    },[companyOverview])

    useEffect(() => {
            localStorage.setItem(keyName, JSON.stringify(pastSearches));
            console.log('setItem')
    },[pastSearches])

    return (
        <div className='carpithians'>
            {/*{console.log(pastSearches)}*/}
            {/*<div className="widgets"> {companyId &&*/}
            {/*    <>*/}
            {/*        <TechnicalAnalysis*/}
            {/*            colorTheme="light"*/}
            {/*            symbol={companyId}*/}
            {/*            width="350"*/}
            {/*            height="375"*/}
            {/*            isTransparent="true"*/}
            {/*        >*/}
            {/*        </TechnicalAnalysis>*/}
            {/*        <SymbolOverview*/}
            {/*            symbols={companyId}*/}
            {/*            lineWidth="1"*/}
            {/*            width="300"*/}
            {/*            height="370"*/}
            {/*            widgetFontColor="black"*/}
            {/*            dateFormat="dd MMM 'yy"*/}
            {/*        >*/}
            {/*        </SymbolOverview>*/}
            {/*    </>*/}
            {/*}*/}
            {/*</div>*/}
        {companyOverview.Name ?
            <DataLayout
                companyOverview={companyOverview}
                isAuth={isAuth}
                error={error}
                companyId={companyId}
                />
            : companyId &&
                <div className="Nodata">
                <p>&nbsp;</p>
                <p>Unfortunately we have no data for this company.</p>
                <p>&nbsp;</p>
                <p>You can click on the below link for data from Tradingview.</p>
                <p>&nbsp;</p>
                <p><a href={`https://www.tradingview.com/symbols/${companyId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                >
                    Link</a></p>
            </div>
            }
        </div>
    );
}

export default SearchResults;