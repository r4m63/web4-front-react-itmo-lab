// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './SignInForm.module.css';
import GoogleLogInButton from "../GoogleLogInButton.jsx";
import {useAuth} from "../../context/AuthContext.jsx";


export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth(); // Получаем функцию для обновления состояния аутентификации


    // Функция для обработки отправки формы
    const handleSignIn = async (event) => {
        event.preventDefault(); // предотвращаем стандартную отправку формы

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8080/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Отправляем email и password
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.accessToken) {
                    // Сохраняем accessToken в localStorage
                    localStorage.setItem('accessToken', responseData.accessToken);
                    setIsAuthenticated(true);
                    navigate('/main');
                } else {
                    alert('Sign-in failed: Access token not received');
                }
            } else {
                const errorData = await response.json(); // Получаем сообщение об ошибке
                if (response.status === 401) {
                    alert('Invalid login credentials'); // Неверные данные для входа
                } else {
                    alert(`Sign-in failed: ${errorData.message || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            alert('An error occurred during sign-in. Please try again later.');
        }
    };


    return (
        <>
            <form className={styles["form"]} onSubmit={handleSignIn}> {/* Используем onSubmit для обработки формы */}
                <h1 style={{ display: "flex", justifyContent: "center" }}>Sign In</h1>

                <div className={styles["flexColumn"]}><label>Email</label></div>
                <div className={styles["inputForm"]}>
                    <input
                        type="text"
                        className={styles["input"]}
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Обработчик для изменения email
                    />
                </div>

                <div className={styles["flexColumn"]}><label>Password</label></div>
                <div className={styles["inputForm"]}>
                    <input
                        type="password"
                        className={styles["input"]}
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Обработчик для изменения пароля
                    />
                </div>

                <div className={styles["flexRow"]}>
                    <div>
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <span className={styles["span"]}>Forgot password?</span>
                </div>

                <button type="submit" className={styles["buttonSubmit"]}>Sign In</button>

                <p className={styles["p"]}>
                    Don&#39;t have an account?
                    <Link to="/signup" className={styles["span"]}>Sign Up</Link>
                </p>

                <p className={styles["p"]}>Or With</p>

                <GoogleLogInButton></GoogleLogInButton>
            </form>
        </>
    );
};