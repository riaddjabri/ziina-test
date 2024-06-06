import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TransactionHistory from './pages/TransactionHistory';

import Header from './components/Header';
import {UserProvider, useUser} from './contexts/UserContext';
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
    return (
        <UserProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/account" element={
                            <ProtectedRouteWrapper>
                                <TransactionHistory/>
                            </ProtectedRouteWrapper>
                        } />
                        <Route path="*" element={<Login />} />
                    </Routes>
                </Router>
        </UserProvider>
    );
};

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useUser();
    return <ProtectedRoute isAuthenticated={isAuthenticated}>{children}</ProtectedRoute>;
};


export default App;
