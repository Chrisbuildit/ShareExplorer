import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "../../context/AuthContext";
import './Profile.css'
import {Link} from "react-router-dom";
import createDateString from "../../helpers/createDateString/CreateDateString";

function Profile() {
    const [lastSearch, setLastSearch] = useState([]);
    const [data, setData] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    useEffect(() => {
        setLastSearch(JSON.parse(localStorage.getItem("lastSearchCompany")));
        console.log(lastSearch);

    }, []);

    useEffect(() => {
        if(lastSearch.length) {
        const overview = lastSearch.reverse();
        setData(overview);
        const currentPost = lastSearch.filter((post) => {
            if(user) {
                return post.User === user.id;
            }})
        setData(currentPost)};
    },[lastSearch]);

    return (
        <div className="Sunny-mountain">
            <div className="Profile-outer">
            {isAuth ?
                <div className="Profile-inner">
                    <h3>Welcome back {user.username}!</h3>
                    {lastSearch ?
                    <>
                        <p>Here you can find historical data on your last 20 searches :</p>
                        <ul className="ProfileList">
                            {data.map((data) => {
                            return <li key={Math.floor(Math.random() * 100)}>
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
                <h3>You need to sign in first.</h3>
            }
            </div>
        </div>
    );
}

export default Profile;