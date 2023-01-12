import React, { useState, useEffect } from 'react';
import './App.css'
import axios from "axios";

function App() {

    const apiKey = 'Q577X5CIYDHZEQY7';

    const [companyOverview, setCompanyOverview] = useState({});

    async function fetchData() {
        try {
            const response = await
                axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${apiKey}`);
            console.log(response.data);
            setCompanyOverview(response.data);
        } catch(e) {
            console.error(e);
        }
    }


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
}

export default App;
