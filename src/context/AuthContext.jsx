import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Создание контекста для авторизации
const AuthContext = createContext();

// 2. Провайдер авторизации
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем наличие токена в localStorage при загрузке компонента
        const token = localStorage.getItem("auth_token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // 3. Логика логина
    const login = (token) => {
        localStorage.setItem("auth_token", token); // Сохраняем токен в localStorage
        setIsAuthenticated(true); // Обновляем состояние авторизации
        navigate("/main"); // Перенаправляем пользователя на главную страницу
    };

    // 4. Логика логаута
    const logout = () => {
        localStorage.removeItem("auth_token"); // Удаляем токен из localStorage
        setIsAuthenticated(false); // Обновляем состояние авторизации
        navigate("/signin"); // Перенаправляем пользователя на страницу входа
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Хук для получения доступа к контексту
export const useAuth = () => useContext(AuthContext);
