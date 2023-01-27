import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import Profile from "./pages/profile/Profile";

function App() {

        const { isAuth } = useContext( AuthContext );

        return (
        <>
            <div>
            <Router>
                <div>
                    <NavBar/>
                    <Routes>
                            <Route exact path="/" element={ <Home/> }/>
                            <Route path="/Profile" element={ isAuth ? <Profile/> : <Navigate to="/"/> }/>
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
