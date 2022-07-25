import React, {createContext, useContext, useEffect, useState,} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    const contextData = {
        isAuthenticated: isAuthenticated.isAuthenticated,
        user: isAuthenticated.user,
        login: login,
        logout: logout,
    }

    useEffect(() => {
        console.log('Context wordt gerefresht')
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            const decodedToken = jwt_decode(token);
            getUserData(decodedToken.sub, token);
            toggleIsAuthenticated({
                status: 'done',
            })
        } else{
            toggleIsAuthenticated({
                isAuthenticated: false,
                user: null,
                status: 'done',
            })
        }
    }, [])

    function login(token) {
        toggleIsAuthenticated({
            isAuthenticated: true,
        });
        console.log(token);
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.sub);
        console.log("Gebruiker is ingelogd");
        getUserData(decodedToken.sub, token);
        history.push("/")
    }

    function logout() {
        localStorage.clear();
        toggleIsAuthenticated({
            isAuthenticated: false,
            user: null,
            status: 'done',
        });
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
                ...isAuthenticated,
                isAuthenticated: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done',
            })
            history.push('/profile');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuthenticated.status === 'done' ? children : <p>loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;