import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "../../context/AuthContext";
import './Profile.css'
import {useNavigate} from "react-router-dom";

function Profile({setCompanyHandler2}) {
    const [lastSearch, setLastSearch] = useState("");
    const {isAuth} = useContext(AuthContext);

    const navigate = useNavigate();

    function handleClick() {
        setCompanyHandler2(lastSearch);
        navigate("/SearchResults")
    }

    useEffect(() => {
        setLastSearch(localStorage.getItem("lastSearchCompany"));
    }, []);

    return (
        <div className="Sunny-mountain">
            {isAuth ?
                <div className="Profile">
                    <h3>Welcome back!</h3>
                    {lastSearch ?
                    <>
                        <p>Your last search was for:</p>
                        <button className="Profilebutton" onClick={handleClick}>{lastSearch}</button>
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