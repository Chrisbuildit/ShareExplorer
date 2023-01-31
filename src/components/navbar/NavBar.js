import './NavBar.css'
import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

function Nav() {
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
                            <SearchBar/>
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
                    </ul>

                </nav>
            </div>
        </header>
    )
}

export default Nav;