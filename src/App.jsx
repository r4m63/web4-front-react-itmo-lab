// eslint-disable-next-line no-unused-vars
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider, GuestRoute, PrivateRoute} from './context/AuthContext';
import SignInPage from "./pages/AuthPage/SignInPage.jsx";
import SignUpPage from "./pages/AuthPage/SignUpPage.jsx";
import VerificationPage from "./pages/AuthPage/VerificationPage.jsx";
import NotFoundPage from "./pages/ErrorPage/NotFoundPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import ProfileSettingsPage from "./pages/ProfilePage/ProfileSettingsPage.jsx";
import LogOutPage from "./pages/AuthPage/LogOutPage.jsx";
import ResetPasswordPage from "./pages/AuthPage/ResetPasswordPage.jsx";
import PassResetConfirmPage from "./pages/AuthPage/PassResetConfirmPage.jsx";

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
                    <Route path="/passreset" element={<GuestRoute><ResetPasswordPage/></GuestRoute>}/>
                    <Route path="/signin/reset-password" element={<GuestRoute><PassResetConfirmPage/></GuestRoute>}/>

                    {/* Только для авторизованных */}
                    <Route path="/main" element={<GuestRoute><ProfilePage/></GuestRoute>}/>
                    <Route path="/settings" element={<GuestRoute><ProfileSettingsPage/></GuestRoute>}/>
                    <Route path="/logout" element={<GuestRoute><LogOutPage/></GuestRoute>}/>

                    PrivateRoute

                    {/* Для всех пользователей */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;