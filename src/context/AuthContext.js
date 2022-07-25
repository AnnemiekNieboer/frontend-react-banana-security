import React, {createContext, useContext, useState,} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuthenticated: false,
        user: null
    });
    const history = useHistory();
    const contextData = {
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
    }

    function login(token) {
        toggleIsAuthenticated(true);
        console.log(token);
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.sub);
        console.log("Gebruiker is ingelogd");
        getUserData(decodedToken.sub, token);
        history.push("/")
    }

    function logout() {
        toggleIsAuthenticated(false);
        console.log("De gebruiker is uitgelogd");
        history.push("/");
    }

    async function getUserData(id, token) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
                });
            console.log(response);
            toggleIsAuthenticated({
                isAuthenticated: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                }
            })
            history.push('/profile');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;