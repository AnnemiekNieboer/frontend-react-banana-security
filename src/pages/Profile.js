import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [secretProfileData, setSecretProfileData] = useState({});


    useEffect(() => {
        async function getProfileData() {
            const token = localStorage.getItem('token');
            console.log(token);
            try {
                const response = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setSecretProfileData(response.data);
                console.log(secretProfileData);
            } catch (e) {
                console.error(e);
            }
        }

        getProfileData();
    }, [])

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <h2>{secretProfileData.title}</h2>
                <p>{secretProfileData.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;