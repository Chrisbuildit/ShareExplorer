import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "../../context/AuthContext";
import './Profile.css'
import {Link} from "react-router-dom";
import createDateString from "../../helpers/createDateString/CreateDateString";

function Profile() {
    const [lastSearch, setLastSearch] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    useEffect(() => {
        setLastSearch(JSON.parse(localStorage.getItem("lastSearchCompany")));
        console.log(lastSearch);

    }, []);

    const overview = lastSearch.reverse()

    const currentPost = overview.filter((post) => {
        if(user) {
        return post.User === user.id;
    }});
    console.log(currentPost)

    return (
        <div className="Sunny-mountain">
            {isAuth ?
                <div className="Profile">
                    <h3>Welcome back!</h3>
                    {lastSearch ?
                    <>
                        <p>Here you can look back on last search results:</p>
                        <ul>
                            {currentPost.map((data) => {
                            return <li key={Math.floor(Math.random() * 100)} className="ProfileList">
                                <Link to={`/company-details/${data.Date}`}>
                                   <span>
                                        <p>{data.Name};&nbsp;</p>
                                        <p>{createDateString(data.Date)}</p>
                                   </span>
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