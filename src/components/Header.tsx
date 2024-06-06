import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {ReactComponent as Logo} from '../assets/logo.svg'


const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">

            <div>
                {isAuthenticated && user && (
                <Link to="/" className="text-xl">
                    Your Balance: {Intl.NumberFormat("en-US", {maximumFractionDigits:2}).format(user.balance)} {user.currency}
                </Link>
                )}
            </div>

            <div>
                <Logo/>
            </div>
            <div className="flex items-center">
                {isAuthenticated && user ? (
                    <>
                        <div className="relative">
                            <button
                                className="relative z-10 block rounded-full overflow-hidden focus:outline-none focus:ring"
                                onClick={handleLogout}
                            >
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={user.avatarUrl}
                                    alt="User Avatar"
                                />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20">
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="text-xl">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
