import React, {useContext, useEffect, useState} from 'react';
// import axios from "axios";
import {Link, useParams} from "react-router-dom";
import './company-details.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";

function CompanyDetails() {

    let { companyId } = useParams();
    const [lastSearch, setLastSearch] = useState([]);
    // const {isAuth} = useContext(AuthContext)
    // const [error, toggleError] = useState(false)

    useEffect(() => {
        setLastSearch(JSON.parse(localStorage.getItem("lastSearchCompany")));
        console.log(lastSearch);
    }, [companyId]);

    const currentPost = lastSearch.find((post) => {
        return post.Symbol === companyId;
    });
    console.log(currentPost);

    return (
    <DataLayout
        companyOverview={currentPost}
        isAuth={true}
        error={false}
        companyId={true}
    />
    )
}

export default CompanyDetails;