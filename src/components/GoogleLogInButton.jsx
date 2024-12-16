// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from "./Form/SignInForm.module.css";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const CLIENT_ID = "363689377201-i7d23g08f1qdek5shkjujs482l8pkjrn.apps.googleusercontent.com"


export default function GoogleLogInButton() {

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth(); // Получаем функцию для обновления состояния аутентификации


    const handleGoogleLoginSuccess = async (response) => {
        const {credential} = response;

        console.log("Credentials: ", credential);
        console.log("Response: ", response);

        try {
            // Отправка данных на сервер
            const res = await fetch('http://localhost:8080/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: credential,  // Токен из Google OAuth
                    credentials: response  // Дополнительные данные
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            // Сохранение accessToken в localStorage
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                console.log("Access Token from server: " + data.accessToken);
                setIsAuthenticated(true);
                // Редирект на главную страницу
                navigate('/main');
            } else {
                console.error('Не удалось получить accessToken');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.log('Google login failed:', error);
        alert("Error Google login");
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>

            <div className={styles["flexRow"]} style={{display: "flex", justifyContent: "center"}}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                    theme="outline" // Тема для кнопки
                    useOneTap
                    className={styles["btn"]} // Добавьте ваш стиль
                >
                    <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                         style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve">
                        {/* SVG */}
                    </svg>
                    Google
                </GoogleLogin>
            </div>
        </GoogleOAuthProvider>

    );
}