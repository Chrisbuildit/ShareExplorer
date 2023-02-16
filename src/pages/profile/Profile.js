import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "../../context/AuthContext";
import './Profile.css'
import {Link} from "react-router-dom";

function Profile() {
    const [lastSearch, setLastSearch] = useState([]);
    const {isAuth} = useContext(AuthContext);

    useEffect(() => {
        setLastSearch(JSON.parse(localStorage.getItem("lastSearchCompany")));

    }, []);

    return (
        <div className="Sunny-mountain">
            {isAuth ?
                <div className="Profile">
                    <h3>Welcome back!</h3>
                    {lastSearch ?
                    <>
                        <p>Your last search was for:</p>
                        <ul>
                            {lastSearch.map((data) => {
                            return <li key={data.id} className="ProfileList">
                                <Link to={`/company-details/${data.id}`}>
                                {data.id}
                                </Link>
                            </li>
                            })}
                        </ul>
                    </>
                    :<p>You have no recorded data.</p>}
                </div>
                :
                <h3 className="Profile">You are not signed in.</h3>
            }
        </div>
    );
}

export default Profile;