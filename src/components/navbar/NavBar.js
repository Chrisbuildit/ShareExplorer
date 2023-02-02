import './NavBar.css'
import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import {AuthContext} from "../../context/AuthContext";

function Nav({setCompanyHandler}) {

    const { logout } = useContext(AuthContext);

    return (
        <header>
            <div className="navbar">
                <nav>
                    <ul>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/">Share Recommendation</NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <SearchBar setCompanyHandler={setCompanyHandler}/>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/Profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/SignIn">Sign In</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/SignUp">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/" onClick={logout}>Sign Out</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Nav;