import './NavBar.css'
import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";
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
                            <Link className="link--default" to="/">Share Recommendation</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <SearchBar
                                setCompanyHandler={setCompanyHandler}
                                className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                            />
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
                            <Link className="link--default" to="/" onClick={logout}>Sign Out</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Nav;