import React, { useContext, useState } from 'react';
import { AuthContext} from "../../context/AuthContext";
import axios from "axios";
import InputField from "../../components/inputfield/InputField";
import {Link} from "react-router-dom";

function SignIn() {

const [ email, setEmail ] = useState( "" )
const [ password, setPassword ] = useState( "" )
const [error, toggleError] = useState(false)

const { login } = useContext( AuthContext )

async function handleLogin(e) {
    e.preventDefault();
    toggleError(false);
    try {
        const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
            email: email,
            password: password,
        })
        login( response.data.accessToken )
    } catch ( e ) {
        console.error( e )
        toggleError(true)

    }
}

return (
    <main className="SignUpIn Mountains">
        <form onSubmit={ handleLogin }>
            <InputField label="Email" type="email" value={ email } setState={setEmail}/>
            <InputField label="Password" type="password" value={ password } setState={setPassword}/>
            {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
            <button type="submit">SignIn</button>
        </form>
        <p>Heb je nog geen account? <Link to="/SignUp">Registreer</Link> je dan eerst.</p>
    </main>
);
}
export default SignIn;