import React, {createContext, useContext, useState,} from "react";
import {useHistory} from "react-router-dom";

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

    function login() {
        toggleIsAuthenticated(true);
        console.log("Gebruiker is ingelogd");
        history.push("/")
    }

    function logout() {
        toggleIsAuthenticated(false);
        console.log("De gebruiker is uitgelogd");
        history.push("/");
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;