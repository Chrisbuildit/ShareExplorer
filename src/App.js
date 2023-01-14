import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css'
import axios from "axios";
import Nav from './components/navbar/NavBar'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";



function App() {


  return (
    <>
    <div className='MountainTop'>
        <NavBar/>
        <main>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/SignUp' element={ <SignUp/> }/>
                <Route path='/SignIn' element={ <SignIn/> }/>
            </Routes>
        </main>
    </div>
    </>
  )
}

export default App;
