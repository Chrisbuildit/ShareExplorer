import React, { useContext } from 'react';
import { AuthContext} from "../../context/AuthContext";

function Profile() {

    const { user : { username } } = useContext(AuthContext)

    return (
        <main className="container">
            <h1>Profile</h1>
            <p>Welcome <span>{ username }</span></p>
        </main>
    );
}

export default Profile;