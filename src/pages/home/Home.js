import React, {useEffect, useState} from 'react';
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar";
import './Home.css'

function Home() {

    const apiKey = 'Q577X5CIYDHZEQY7';

    const [companyOverview, setCompanyOverview] = useState({});
    const [company, setCompany] = useState(null)


    async function fetchData() {
        try {
            const response = await
                axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=${apiKey}`);
            console.log(response.data);
            setCompanyOverview(response.data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        if(company) {
            fetchData();
        }
    },[company]);

    return (
        <div className='container carpithians1'>
            <SearchBar setCompanyHandler={setCompany}/>
            <div> {companyOverview &&
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
                        </section>
                        <section>
                            <h3><u>Ratios:</u></h3>
                            <p><b>PE Ratio</b>: {companyOverview.PERatio}</p>
                            <p><b>Trailing PE</b>: {companyOverview.TrailingPE}</p>
                            <p><b>Forward PE</b>: {companyOverview.ForwardPE}</p>
                            <p><b>PEG Ratio</b>: {companyOverview.PEGRatio}</p>
                            <p><b>Price to book</b>: {companyOverview.PriceToBookRatio}</p>
                            <p><b>Price to sales</b>: {companyOverview.PriceToSalesRatioTTM}</p>
                        </section>
                        <section>
                            <p></p>
                            <p><b>Profit Margin</b>: {companyOverview.ProfitMargin}</p>
                            <p><b>Operating Margin</b>: {companyOverview.OperatingMarginTTM}</p>
                            <p><b>PEGRatio</b>: {companyOverview.PEGRatio}</p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                        </section>
                        <section>
                            <p></p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                            <p><u>a</u></p>
                        </section>
                    </span>
                </>
            }
            </div>
        </div>
    );
}

export default Home;