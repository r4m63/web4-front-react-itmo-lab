import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

export default function LogOutPage() {
    const navigate = useNavigate();
    const {setIsAuthenticated} = useAuth();


    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        document.cookie = 'accessToken=; Max-Age=0; path=/';
        setIsAuthenticated(false);
        navigate('/signin');
    };

    handleLogOut();

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );

};

