import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './auth'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in and then set the user state
        if (AuthService.loggedIn()) {
            const userProfile = AuthService.getProfile();
            setUser(userProfile);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);