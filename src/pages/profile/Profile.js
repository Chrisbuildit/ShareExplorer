import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import './Profile.css'

function Profile() {
    const [companies, setCompanies] = useState("");
    const {isAuth} = useContext(AuthContext);

    useEffect(() => {
        setCompanies(localStorage.getItem("companies"));
    }, []);

    return (
        <div className="Sunny-mountain">
            {isAuth ?
                <div className="Profile">
                    <h3>Welkom terug!</h3>
                    <p>De laatste bedrijf die je hebt bezocht verschijnt beneden:</p>
                    <p><Link to="/SearchResults">{companies}</Link></p>
                </div>
                :
                <p className="Profile">Je bent niet ingelogd</p>
            }
        </div>
    );
}

export default Profile;