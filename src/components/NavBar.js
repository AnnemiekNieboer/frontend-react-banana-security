import React from 'react';
import logo from '../assets/banana-01.png';
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const history = useHistory();
    const {isAuthenticated, logout} = React.useContext(AuthContext);
    console.log(isAuthenticated);

    return (
        <nav>

            <Link to="/">
                <span className="logo-container">
                    <img src={logo} alt="logo"/>
                    <h3>
                    Banana Security
                    </h3>
                </span>
            </Link>

            {isAuthenticated ?
                <div>
                    <button
                        type="button"
                        onClick={() => history.push('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        Registreren
                    </button>
                </div>
                :
                <button onClick={logout}>log uit</button>

            }
        </nav>
    );
}

export default NavBar;