import React, {useEffect, useState} from 'react';
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar";

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
        <div className='mountain-top'>
            <SearchBar className='SearchBar' setCompanyHandler={setCompany}/>
        <div> {companyOverview &&
            <>
                <span> {company &&
                    <>
                    <p><b>Name</b>: {companyOverview.Name}</p>
                    <p><b>PriceToBookRatio</b>: {companyOverview.PriceToBookRatio}</p>
                    <p><b>PEGRatio</b>: {companyOverview.PEGRatio}</p>
                    </>
                }
                </span>
            </>
        }
        </div>
        </div>
    );
}

export default Home;