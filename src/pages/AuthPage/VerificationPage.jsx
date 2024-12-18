import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";


export default function VerificationPage() {

    const location = useLocation();  // Для доступа к текущему URL
    const navigate = useNavigate();  // Для редиректа на другие страницы
    const {setIsAuthenticated} = useAuth(); // Получаем функцию для обновления состояния аутентификации

    useEffect(() => {
        // Функция для получения параметров из query string
        const getQueryParam = (param) => {
            const urlParams = new URLSearchParams(location.search);
            return urlParams.get(param);
        };

        const token = getQueryParam('token');  // Извлекаем токен из URL

        const data = {
            token: token
        };

        if (token) {
            // Если токен существует, выполняем запрос на сервер
            fetch('http://localhost:8080/signup/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),  // Отправляем токен на сервер
            })
                .then((response) => {
                    // Проверяем, успешный ли статус ответа
                    if (!response.ok) {
                        // Если статус не успешный (например, 404 или 500), выбрасываем ошибку
                        return response.json().then((errorData) => {
                            throw new Error(errorData.message || 'Ошибка на сервере');
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        document.cookie = `accessToken=${data.accessToken}`;
                        setIsAuthenticated(true);
                        navigate('/signin');
                    } else {
                        navigate('/verification-failed');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при верификации:', error);
                    navigate('/verification-error');
                });
        } else {
            // Если токен отсутствует в URL, редиректим на ошибочную страницу
            navigate('/verification-error');
        }
    }, [location, navigate]);

    return (
        <h1>Verification...</h1>
    );
}
