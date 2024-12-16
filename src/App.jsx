// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, GuestRoute, PrivateRoute } from './context/AuthContext';
import SignInPage from "./pages/AuthPage/SignInPage.jsx";
import SignUpPage from "./pages/AuthPage/SignUpPage.jsx";
import VerificationPage from "./pages/AuthPage/VerificationPage.jsx";
import NotFoundPage from "./pages/ErrorPage/NotFoundPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import ProfileSettingsPage from "./pages/ProfilePage/ProfileSettingsPage.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Только для гостей */}
                    <Route path="/" element={<GuestRoute><SignInPage /></GuestRoute>} />
                    <Route path="/signin" element={<GuestRoute><SignInPage /></GuestRoute>} />
                    <Route path="/signup" element={<GuestRoute><SignUpPage /></GuestRoute>} />
                    <Route path="/signup/verification" element={<GuestRoute><VerificationPage /></GuestRoute>} />

                    {/* Только для авторизованных */}
                    <Route path="/main" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><ProfileSettingsPage /></PrivateRoute>} />

                    {/* Для всех пользователей */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;