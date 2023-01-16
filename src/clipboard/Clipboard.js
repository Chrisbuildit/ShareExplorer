import React, {useEffect, useState} from 'react';
import './App.css'
import axios from "axios";

function Clipboard() {

    const apiKey = 'Q577X5CIYDHZEQY7';

    const [companyOverview, setCompanyOverview] = useState({});
    const [company, setCompany] = useState('')

    async function fetchData() {
        try {
            const response = await
                axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=${apiKey}`);
            console.log(response.data);
            setCompanyOverview(response.data);
        } catch(e) {
            console.error(e);
        }
        useEffect(() => {
            if(company) {
                fetchData()
            }
        },[company]);

    return (
        <div>

            <button
                type='button'
                onClick={fetchData}>
                Button
            </button>

            <span>
          {Object.keys(companyOverview).length > 0 &&
              <>
                  <h3>Name: {companyOverview.Name}</h3>
                  <h3>PriceToBookRatio: {companyOverview.PriceToBookRatio}</h3>
                  <h3>PEGRatio: {companyOverview.PEGRatio}</h3>
              </>
          }
      </span>
        </div>

    )
}}

export default Clipboard;



