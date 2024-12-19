// eslint-disable-next-line no-unused-vars
import React, {createContext, useContext, useEffect, useState} from "react";
import {Navigate, } from "react-router-dom";

// 1. Создание контекста для авторизации
const AuthContext = createContext();
// 2. Создание провайдера контекста
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");  // Проверка токена в localStorage
        setIsAuthenticated(!!token);  // Устанавливаем состояние на основе наличия токена
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Хук для доступа к контексту
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// 4. Компонент для защищенных маршрутов
// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated)
        return children;
    else
        return <Navigate to="/signin"/>;
};

// 5. Компонент для гостевых маршрутов
// eslint-disable-next-line react/prop-types
export const GuestRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated)
        return <Navigate to="/main"/>;
    else
        return children;
};