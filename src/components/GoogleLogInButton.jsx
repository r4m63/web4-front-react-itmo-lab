// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from "./Form/SignInForm.module.css";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

const CLIENT_ID = "363689377201-i7d23g08f1qdek5shkjujs482l8pkjrn.apps.googleusercontent.com"


export default function GoogleLogInButton() {

    const handleLoginSuccess = (response) => {
        console.log('Google login successful:', response);
        // Обработайте успешный логин
    };

    const handleLoginFailure = (error) => {
        console.log('Google login failed:', error);
        alert("Error Google login");
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>

            <div className={styles["flexRow"]}>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    theme="outline" // Тема для кнопки
                    useOneTap
                    className={styles["btn"]} // Добавьте ваш стиль
                >
                    <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                         style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve">
                        {/* ваш SVG код */}
                    </svg>
                    Google
                </GoogleLogin>
            </div>
        </GoogleOAuthProvider>

    );
}