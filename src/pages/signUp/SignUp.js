import React, { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext} from "../../context/AuthContext";
import InputField from "../../components/inputfield/InputField";
import {Link} from "react-router-dom";


function SignUp() {
    const [ email, setEmail ] = useState( "" )
    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [role, setRole] = useState([""])
    const [error, toggleError] = useState("")

    const { login } = useContext( AuthContext )

    async function registerUser(e) {
        e.preventDefault()
        toggleError(false);
        console.log( "De gebruiker is geregistreerd 👤" )
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',{
                email: email,
                username: username,
                password: password,
                role: role,
            })
            login( response.data.accessToken )
        } catch ( e ) {
            console.error( e )
            toggleError(true);
        }
    }

    return (
        <main className="SignUpIn mountain-top">
            <form onSubmit={ registerUser }>
                <InputField label="Email:" type="email" value={ email } setState={setEmail}/>
                <InputField label="Username:" type="text" value={ username } setState={setUsername}/>
                <InputField label="Password:" type="password" value={ password } setState={setPassword}/>
                <InputField label="Role:" type="text" value={ role } setState={setRole}/>
                {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                <button type="submit">Sign Up</button>
            </form>
        </main>
    );
}

export default SignUp;