import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user'
import { LoginSuccess, LoginFail } from '../types/authResponse';
import apiFetch from "../utils/api";

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<LoginSuccess | LoginFail>;
    logout: () => void;
    fetchUserInfo: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
            fetchUserInfo();
        }
    }, []);

    const fetchUserInfo = async () => {

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        try {
            const response = await apiFetch('/user/info');

            if (response.ok) {
                const userData: User = await response.json();
                setUser(userData);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data: { accessToken: string; refreshToken: string } = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setIsAuthenticated(true);
                await fetchUserInfo();
                return data;
            } else {
                console.log('Error : Failed to login')
                const errorData = await response.json();
                return errorData;
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
            return false
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout, fetchUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
