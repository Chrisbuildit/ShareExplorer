import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {TechnicalAnalysis} from "react-ts-tradingview-widget";
import {SymbolOverview} from "react-ts-tradingview-widget";
import {AuthContext} from "../../context/AuthContext";
import {Link, useParams} from "react-router-dom";
import './company-details.css'


function CompanyDetails() {

    const apiKey = 'Q577X5CIYDHZEQY7';

    const [companyOverview, setCompanyOverview] = useState({});
    const {isAuth} = useContext(AuthContext);
    const [error, toggleError] = useState(false)
    const [pastSearches, setPastSearches] = useState([])
    // Get the userId param from the URL.
    let {companyId} = useParams();

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            try {
                const response = await
                    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyId}&apikey=${apiKey}`);
                // console.log(response.data);
                setCompanyOverview(response.data);
                // isAuth && setPastSearches([...pastSearches,{id: companyId}])
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
        // const timeout = setTimeout(() => {
        isAuth && setPastSearches([...pastSearches,{id: companyId}])
        //     }, 3000);
        // clearTimeout(timeout);
        isAuth && localStorage.setItem("lastSearchCompany",JSON.stringify(pastSearches));
    },[companyOverview, companyId])

    return (
        <div className='carpithians outer-container'>
            <p> {companyId && !isAuth &&
                <Link to="/SignIn" className="SaveOption">
                    Sign in for your latest search result to be automatically saved
                </Link>}
            </p>
            {/*{console.log(pastSearches)}*/}
            <div className='inner-container'>
               {/* <div className="widgets"> {companyId &&
                    <>
                        <TechnicalAnalysis
                            colorTheme="light"
                            symbol={companyId}
                            width="350"
                            height="375"
                            isTransparent="true"
                        >
                        </TechnicalAnalysis>
                        <SymbolOverview
                            symbols={companyId}
                            lineWidth="1"
                            width="350"
                            height="370"
                            widgetFontColor="black"
                            dateFormat="dd MMM 'yy"
                        >
                        </SymbolOverview>
                    </>
                }
                </div>
                <div>{error &&
                    <>
                        <p>There was a miscommunication with the server in fetching your fundamental data.</p>
                        <p>&nbsp;</p>
                        <p>Please try again.</p>
                    </>
                }</div>*/}


            <h2>Fundamental data:</h2>
            {Object.keys(companyOverview).length > 0 ?
                <span>
                    <section>
                        <h3><u>General:</u></h3>
                        <p><b>Name</b>: {companyOverview.Name}</p>
                        <p><b>Symbol</b>: {companyOverview.Symbol}</p>
                        <p><b>Stock exchange</b>: {companyOverview.Exchange}</p>
                        <p><b>Fiscal Yearend</b>: {companyOverview.FiscalYearEnd}</p>
                        <p><b>Industry</b>: {companyOverview.Industry}</p>
                        <p><b>Sector</b>: {companyOverview.Sector}</p>

                        <h3><u>Ratios:</u></h3>
                        <p><b>PE Ratio</b>: {companyOverview.PERatio}</p>
                        <p><b>Trailing PE</b>: {companyOverview.TrailingPE}</p>
                        <p><b>Forward PE</b>: {companyOverview.ForwardPE}</p>
                        <p><b>PEG Ratio</b>: {companyOverview.PEGRatio}</p>
                        <p><b>Price to book</b>: {companyOverview.PriceToBookRatio}</p>
                        <p><b>Price to sales</b>: {companyOverview.PriceToSalesRatioTTM}</p>
                    </section>
                    <section>
                        <h3><u>&nbsp;</u></h3>
                        <p><b>Profit Margin</b>: {companyOverview.ProfitMargin}</p>
                        <p><b>Operating Margin</b>: {companyOverview.OperatingMarginTTM}</p>
                        <p><b>EV to EBITDA</b>: {companyOverview.EVToEBITDA}</p>
                        <p><b>EV to revenue</b>: {companyOverview.EVToRevenue}</p>
                        <p><b>Return on Assets</b>: {companyOverview.ReturnOnAssetsTTM}</p>
                        <p><b>Return on Equity</b>: {companyOverview.ReturnOnEquityTTM}</p>

                        <h3><u>Dividend & EPS:</u></h3>
                        <p><b>Dividend date</b>: {companyOverview.DividendDate}</p>
                        <p><b>Ex dividend date</b>: {companyOverview.ExDividendDate}</p>
                        <p><b>Dividend yield</b>: {companyOverview.DividendYield}</p>
                        <p><b>Diluted EPS TTM</b>: {companyOverview.DilutedEPSTTM}</p>
                        <p><b>Quart. earnings growth</b>: {companyOverview.QuarterlyEarningsGrowthYOY}</p>
                        <p><b>Quart. Revenue growth</b>: {companyOverview.QuarterlyRevenueGrowthYOY}</p>
                    </section>
                </span>
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
        </div>
    );
}

export default CompanyDetails;