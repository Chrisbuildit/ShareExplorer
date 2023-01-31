import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";
import {AuthContext} from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import StateContextProvider from "./context/StateContext";

function App() {

        const { isAuth } = useContext( AuthContext );

        return (
        <>
            <StateContextProvider>
                    <NavBar/>
                    <Routes>
                            <Route exact path="/" element={ <Home/> }/>
                            <Route path="/Profile" element={ isAuth ? <Profile/> : <p>Je bent niet ingelogd</p> }/>
                            <Route path="/SignUp" element={ <SignUp/> }/>
                            <Route path="/SignIn" element={ <SignIn/> }/>
                    </Routes>
            </StateContextProvider>
        </>
    )
}

export default App;
