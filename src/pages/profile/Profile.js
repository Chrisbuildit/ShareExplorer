import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";

function Profile() {
    const [companies, setCompanies] = useState("");
    const { user : { username } } = useContext(AuthContext);

    useEffect(() => {
        setCompanies(localStorage.getItem("companies"));
    }, []);

    return (
        <main className="container">
            <p>Welcome <span>{ username }</span></p>
            <p><Link to="/SearchResults">{companies}</Link></p>
        </main>
    );
}

export default Profile;