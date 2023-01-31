import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar";
import './Home.css'
import { TechnicalAnalysis } from "react-ts-tradingview-widget";
import { SymbolOverview } from "react-ts-tradingview-widget";
import {StateContext} from "../../context/StateContext";
import {Link} from "react-router-dom";


function Home() {

    const apiKey = 'Q577X5CIYDHZEQY7';

    const {company} = useContext(StateContext);
    const [companyOverview, setCompanyOverview] = useState({});
    const [error, toggleError] = useState(false)

    async function fetchData() {
        toggleError(false);
        try {
            const response = await
                axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=${apiKey}`);
            console.log(response.data);
            setCompanyOverview(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }
    useEffect(() => {
        if(company) {
            fetchData();
        }

    },[company]);


    return (

        <div className='container carpithians1'>
            <div className="widgets"> {company &&
                <>
                {/*<TechnicalAnalysis*/}
                {/*    colorTheme="light"*/}
                {/*    symbol={company}*/}
                {/*    width="350"*/}
                {/*    height="375"*/}
                {/*    isTransparent="true"*/}
                {/*>*/}
                {/*</TechnicalAnalysis>*/}
                <SymbolOverview
                    symbols={company}
                    lineWidth="1"
                    width="350"
                    height="370"
                    widgetFontColor="black"
                    >
                </SymbolOverview>
                </>
            }
            </div>
            <div> {!companyOverview.Name ?
                <div> {company &&
                    <>
                    <p>Er is helaas geen data beschikbaar voor deze bedrijf.</p>
                    <p>Klik op onderstaande link voor data van Tradingview.</p>
                    <p><a href={`https://www.tradingview.com/symbols/${company}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                    >
                    Link</a></p>
                    </>
                }
                </div> :
                <>
                    <h2>Fundamental data:</h2>
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
                </>
            }
            </div>
        </div>
    );
}

export default Home;