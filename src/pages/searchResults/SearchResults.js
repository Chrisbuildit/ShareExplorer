import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import './SearchResults.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";

function SearchResults() {

    const apiKey = 'Q577X5CIYDHZEQY7';

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
        async function fetchData() {
            toggleError(false);
            try {
                const response = await
                    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${apiKey}`);
                if(user) {
                response.data.Date = Date.now();
                response.data.User = user.id;}
                setCompanyOverview(response.data);
                // console.log(companyOverview);
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
        if(companyOverview.Symbol)
            if(pastSearches.length < 20) {
            isAuth && setPastSearches([...pastSearches, companyOverview]);
        }
            else {
            setPastSearches(pastSearches.shift());
            isAuth && setPastSearches([...pastSearches, companyOverview]);
        }
    },[companyOverview])

    useEffect(() => {
            localStorage.setItem(keyName, JSON.stringify(pastSearches));
            console.log('setItem')
    },[pastSearches])

    return (
        <div className='carpithians'>
        {companyOverview.Name ?
            <DataLayout
                companyOverview={companyOverview}
                isAuth={isAuth}
                error={error}
                companyId={companyId}
                />
            : companyId &&
                <>
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
            </>
            }
        </div>
    );
}

export default SearchResults;