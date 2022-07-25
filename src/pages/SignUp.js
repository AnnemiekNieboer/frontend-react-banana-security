import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [emailValue, setEmailValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const history = useHistory();

    async function registerData(e) {
        e.preventDefault()
        console.log(emailValue);
        console.log(usernameValue);
        console.log(passwordValue);
        try {
            await axios.post('http://localhost:3000/register', {
                email: emailValue,
                password: passwordValue,
                username: usernameValue,
            });
            history.push('/signin');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={registerData}>
                <p>
                    <label htmlFor="e-mail">
                        E-mail:
                        <input
                            id="e-mail"
                            name="email"
                            type="email"
                            placeholder="e-mail"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </label>
                    <label htmlFor="userName">
                        Voornaam:
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="voornaam"
                            value={usernameValue}
                            onChange={(e) => setUsernameValue(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                    </label>
                    <button
                    type="submit">
                        Submit
                    </button>
                </p>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;