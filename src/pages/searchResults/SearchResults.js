import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import './SearchResults.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";
import Widget from "../../components/widget/Widget";

function SearchResults() {

    const [companyOverview, setCompanyOverview] = useState({});
    const [error, toggleError] = useState(false)

    const {isAuth, user} = useContext(AuthContext);
    let {companyId} = useParams();

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            try {
                const response = await
                    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${process.env.REACT_APP_API_KEY}`);
                if (user) {
                    response.data.Date = Date.now();
                    response.data.User = user.id;
                }
                setCompanyOverview(response.data);
                console.log(response);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (companyId) {
            void fetchData();
        }
    }, [])


    useEffect(() => {
        let pastSearches = JSON.parse(localStorage.getItem("lastSearchCompany")) || [];
        if (companyOverview.Symbol && isAuth)
            if (pastSearches.length < 20) {
                pastSearches = [...pastSearches, companyOverview];
                console.log('<20')
            } else {
                const newSearches = pastSearches.slice(1);
                pastSearches = [...newSearches, companyOverview];
                console.log('>20')
            }
        localStorage.setItem("lastSearchCompany", JSON.stringify(pastSearches));
    }, [companyOverview])

    return (
        <div className='carpithians'>
            <div className='SearchResults'>
                {companyOverview.Name ?
                    <>
                        <Widget className="widgets" companyId={companyId}/>
                        <DataLayout
                            companyOverview={companyOverview}
                            isAuth={isAuth}
                            error={error}
                            companyId={companyId}
                        />
                    </>
                    : companyId &&
                    <section className="Nodata">
                        <p>Unfortunately we have no data for this company.</p>
                        <p>You can click on the below link for data from Tradingview.</p>
                        <p><a href={`https://www.tradingview.com/symbols/${companyId}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                            Link</a></p>
                    </section>
                }
            </div>
        </div>
    );
}

export default SearchResults;