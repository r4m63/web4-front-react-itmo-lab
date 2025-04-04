// eslint-disable-next-line no-unused-vars
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
            fetch('http://45.93.5.140:21001/signup/verification', {
                method: 'POST',
                credentials: 'include',
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
                        document.cookie = `accessToken=${data.accessToken}; path=/; domain=ramil21.ru;`;
                        setIsAuthenticated(true);
                        navigate('/main');
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
            navigate('/verification-error2');
        }
    }, [location, navigate]);

    return (
        <h1>Verification...</h1>
    );
}
