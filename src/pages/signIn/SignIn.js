import React, { useContext, useState } from 'react';
import { AuthContext} from "../../context/AuthContext";
import axios from "axios";
import InputField from "../../components/inputfield/InputField";
import {Link} from "react-router-dom";

function SignIn() {
const [ username, setUsername ] = useState( "" )
const [ password, setPassword ] = useState( "" )
const [error, toggleError] = useState(false)

const { login } = useContext( AuthContext )

async function handleLogin(e) {
    e.preventDefault();
    toggleError(false);
    try {
        const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
            username: username,
            password: password,
        })
        login( response )
    } catch ( e ) {
        console.error( e )
        toggleError(true)

    }
}

return (
    <main className="SignUpIn Mountains">
        <form onSubmit={ handleLogin }>
            <InputField label="Username:" type="text" value={ username } setState={setUsername}/>
            <InputField label="Password" type="password" value={ password } setState={setPassword}/>
            {error && <p className="error">Combinatie van username en wachtwoord is onjuist</p>}
            <button type="submit">SignIn</button>
        </form>
        <p>Heb je nog geen account? <Link to="/SignUp">Registreer</Link> je dan eerst.</p>
    </main>
);
}
export default SignIn;