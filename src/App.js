import React, { useContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";
import SearchResults from "./pages/searchResults/SearchResults";
import {AuthContext} from "./context/AuthContext";
import Profile from "./pages/profile/Profile";

function App() {

        const { isAuth } = useContext( AuthContext );
        const [company, setCompany] = useState("")

        return (
        <>
                    <NavBar setCompanyHandler={setCompany}/>
                    <Routes>
                            <Route path="/" element={ <Home/> }/>
                            <Route path="/SearchResults" element={ <SearchResults company={company}/> }/>
                            <Route path="/Profile" element={ isAuth ? <Profile/> : <p className="Profile">Je bent niet ingelogd</p> }/>
                            {/*<Route path="/Profile" element={ <Profile/> }/>*/}
                            <Route path="/SignUp" element={ <SignUp/> }/>
                            <Route path="/SignIn" element={ <SignIn/> }/>
                    </Routes>
        </>
    )
}

export default App;
