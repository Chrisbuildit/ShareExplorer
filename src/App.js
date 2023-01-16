import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";
import SearchBar from "./components/searchBar/SearchBar";
import {BrowserRouter as Router} from "react-router-dom";

function App() {

        return (
        <>
            <div>
            <Router>
                <div>
                    <NavBar/>
                    <Routes>
                            <Route exact path="/" element={ <Home/> }/>
                            <Route path="/SignUp" element={ <SignUp/> }/>
                            <Route path="/SignIn" element={ <SignIn/> }/>
                    </Routes>
                </div>
            </Router>
            </div>
        </>
    )
}

export default App;
