import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import './SearchResults.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";

function SearchResults() {

    const apiKey = 'Q577X5CIYDHZEQY7';

    const [companyOverview, setCompanyOverview] = useState({});
    const [error, toggleError] = useState(false)
    const [pastSearches, setPastSearches] = useState([])
    const {isAuth} = useContext(AuthContext)
    // Get the userId param from the URL.
    let {companyId} = useParams();

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            try {
                const response = await
                    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${apiKey}`);
                setCompanyOverview(response.data);
                isAuth && setPastSearches(JSON.parse(localStorage.getItem("lastSearchCompany")));
                isAuth && setPastSearches([...pastSearches,{id: companyId}])
                // isAuth && localStorage.setItem("lastSearchCompany",JSON.stringify(pastSearches));
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (companyId) {
            void fetchData();
        }
    }, []);

    useEffect(() => {
        isAuth && localStorage.setItem("lastSearchCompany",JSON.stringify(pastSearches));
    },[companyOverview])

    return (
        <>
        {console.log(pastSearches)}
        <DataLayout
            companyOverview={companyOverview}
            isAuth={isAuth}
            error={error}
            companyId={companyId}
            />
        </>
    );
}

export default SearchResults;