import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './auth'
import { client } from '../App'
import { QUERY_ME } from '../utils/queries'

// AuthContext handles user data fetching and updates the context; used for authentication actions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (AuthService.loggedIn()) {
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        const { data } = await client.query({ query: QUERY_ME });
        setUser(data.me);
    };

    const login = async (idToken) => {
        AuthService.login(idToken);
        await fetchUserData();
        window.location.assign('/me');
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        window.location.assign('/');
    };


    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);