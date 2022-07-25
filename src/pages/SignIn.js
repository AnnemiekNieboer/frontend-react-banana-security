import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import authContext, {AuthContext} from '../context/AuthContext';
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    async function submitLogin(e) {
        e.preventDefault();
        console.log(emailValue);
        console.log(passwordValue);
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: emailValue,
                password: passwordValue,
            });
            console.log(result.data);
            login(result.data.accessToken);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={submitLogin}>
                <p>
                    <label htmlFor='email'>
                        E-mail:
                        <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='e-mail adres'
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </label>
                    <label htmlFor='password'>
                        Wachtwoord:
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='password'
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                    </label>
                </p>
                <button
                    type='submit'
                >
                    Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;