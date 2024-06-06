import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
                        <Route path="/account" element={
                            <ProtectedRouteWrapper>
                                <TransactionHistory/>
                            </ProtectedRouteWrapper>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<DefaultRoute />} />
                    </Routes>
                </Router>
        </UserProvider>
    );
};

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useUser();
    console.log('ici', isAuthenticated)
    return <ProtectedRoute isAuthenticated={isAuthenticated}>{children}</ProtectedRoute>;
};

const DefaultRoute: React.FC = () => {
    const { isAuthenticated } = useUser();

    console.log('la', isAuthenticated);
    return isAuthenticated ? <Navigate to="/account" /> : <Login />;
};


export default App;
