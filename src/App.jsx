// eslint-disable-next-line no-unused-vars
import React, {createContext, useContext, useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import SignInPage from "./pages/AuthPage/SignInPage.jsx";
import SignUpPage from "./pages/AuthPage/SignUpPage.jsx";
import VerificationPage from "./pages/AuthPage/VerificationPage.jsx";
import NotFoundPage from "./pages/ErrorPage/NotFoundPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import ProfileSettingsPage from "./pages/ProfilePage/ProfileSettingsPage.jsx";

const CLIENT_ID = "363689377201-i7d23g08f1qdek5shkjujs482l8pkjrn.apps.googleusercontent.com"

// 1. Создание контекста для авторизации
const AuthContext = createContext();

// 2. Создание провайдера контекста
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");  // Проверка токена в localStorage
        if (token) {
            setIsAuthenticated(true);  // Если токен есть, считаем, что пользователь авторизован
        } else {
            setIsAuthenticated(false);  // Если токен отсутствует, считаем, что пользователь не авторизован
        }
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Хук для доступа к контексту
const useAuth = () => useContext(AuthContext);

// 4. Компонент для защищенных маршрутов (если не авторизован, перенаправляет на /signin)
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated) {
        return children;  // Если авторизован, показываем содержимое
    } else {
        return <Navigate to="/signin"/>;  // Если не авторизован, перенаправляем на /signin
    }
};

// 5. Компонент для гостевых маршрутов (если авторизован, перенаправляет на /main)
// eslint-disable-next-line react/prop-types
const GuestRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    return !isAuthenticated ? children : <Navigate to="/main"/>;
};

// 6. Главный компонент приложения
const App = () => {
    return (
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Только для гостей */}
                        <Route path="/" element={<GuestRoute><SignInPage/></GuestRoute>}/>
                        <Route path="/signin" element={<GuestRoute><SignInPage/></GuestRoute>}/>
                        <Route path="/signup" element={<GuestRoute><SignUpPage/></GuestRoute>}/>
                        <Route path="/signup/verification" element={<GuestRoute><VerificationPage/></GuestRoute>}/>

                        {/* Только для авторизованных */}
                        <Route path="/main" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                        <Route path="/settings" element={<PrivateRoute><ProfileSettingsPage/></PrivateRoute>}/>

                        {/* Для всех пользователей */}
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
    );
};

export default App;
