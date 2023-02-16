import React, {useContext} from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";
import SearchResults from "./pages/searchResults/SearchResults";
import Profile from "./pages/profile/Profile";
import CompanyDetails from "./pages/company-details/company-details";

function App() {


        return (
        <>
            <NavBar />
            <Routes>
                    <Route path="/" element={ <Home /> }/>
                    <Route path="/searchResults/:companyId" element={ <SearchResults /> }/>
                    <Route path="/company-details/:companyId" element={ <CompanyDetails /> }/>
                    <Route path="/profile" element={ <Profile /> }/>
                    <Route path="/signUp" element={ <SignUp/> }/>
                    <Route path="/signIn" element={ <SignIn/> }/>
            </Routes>
        </>
    )
}

export default App;
