import './SignUp.css'
import React, { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext} from "../../context/AuthContext";
import InputField from "../../components/inputfield/InputField";


function SignUp() {
    const [ email, setEmail ] = useState( "" )
    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )

    const { login } = useContext( AuthContext )

    async function registerUser(e) {
        e.preventDefault()
        console.log( "De gebruiker is geregistreerd 👤" )
        try {
            const response = await axios.post('http://localhost:3000/register',{
                email: email,
                username: username,
                password: password,
            })
            login( response.data.accessToken )
        } catch ( e ) {
            console.error( e )
        }
    }

    return (
        <main className="mountain-top">
            <form onSubmit={ registerUser }>
                <InputField label="Email:" type="email" value={ email } setState={setEmail}/>
                <InputField label="Username:" type="text" value={ username } setState={setUsername}/>
                <InputField label="Password:" type="password" value={ password } setState={setPassword}/>
                <button className='SignUpButton' type="submit">Sign Up</button>
            </form>
        </main>
    );
}

export default SignUp;