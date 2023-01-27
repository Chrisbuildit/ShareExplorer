import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {

    const [ auth, setAuth ] = useState( {
        isAuth: false,
        user: null,
        status: "pending"
    } );
    const navigate = useNavigate()

    useEffect( () => {
        // haal de JWT op uit Local Storage
        const storedToken = localStorage.getItem( 'token' )


        // als er WEL een token is, haal dan opnieuw de gebruikersdata op
        if ( storedToken ) {
            const decodedToken = jwt_decode( storedToken )

            if ( Math.floor( Date.now() / 1000 ) < decodedToken.exp ) {
                console.log( "De gebruiker is NOG STEEDS ingelogd 🔓" )
                void fetchUserData( storedToken, decodedToken.sub )
            } else  {
                console.log( "De token is verlopen" )
                localStorage.removeItem( 'token' )
            }
        } else {
            // als er GEEN token is doen we niks
            setAuth( {
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            } )
        }
    }, [] )

    function login( jwt ) {
        console.log( "De gebruiker is ingelogd 🔓" )
        localStorage.setItem( 'token', jwt )
        const decodedToken = jwt_decode( jwt );

        void fetchUserData( jwt, decodedToken.sub, "/Profile" )
    }

    async function fetchUserData( jwt, id, redirect ) {
        try {
            const response = await axios.get( `http://localhost:3000/600/users/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ jwt }`,
                }
            } )
            setAuth( {
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                    username: response.data.username
                },
                status: "done"
            } )
            if ( redirect ) {
                navigate( redirect )
            }
            console.log( response )
        } catch ( e ) {
            console.error( e )
            setAuth( {
                ...auth,
                status: "done"
            } )
        }
    }

    function logout() {
        console.log( "De gebruiker is uitgelogd 🔒" )
        localStorage.removeItem( 'token' )
        setAuth( {
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        } )
        navigate( "/SignIn" )
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={ contextData }>
            { auth.status === "done" ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;