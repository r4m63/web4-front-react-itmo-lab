// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

export default function ClockGraph() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // Обновление каждую секунду
        return () => clearInterval(interval); // Очистка таймера при размонтировании
    }, []);

    // Вычисление углов для осей
    const hours = time.getHours() % 12; // Часовая стрелка (12 часов)
    const minutes = time.getMinutes(); // Минутная стрелка
    const seconds = time.getSeconds(); // Секундная стрелка

    const hourAngle = (hours * 30) + (minutes / 60) * 30; // 30 градусов на час
    const minuteAngle = minutes * 6; // 6 градусов на минуту
    const secondAngle = seconds * 6; // 6 градусов на секунду

    return (
        <svg
            id="graph"
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
        >
            {/* Оси, повернутые согласно времени */}
            <g transform={`rotate(${hourAngle}, 250, 250)`}>
                <line x1="250" y1="250" x2="250" y2="0" stroke="#000" />
            </g>
            <g transform={`rotate(${minuteAngle}, 250, 250)`}>
                <line x1="250" y1="250" x2="250" y2="0" stroke="#000" />
            </g>

            {/* Засечки и подписи */}
            <circle cx="250" cy="250" r="200" stroke="#ccc" fill="none" />
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180; // Угол в радианах
                const x = 250 + Math.sin(angle) * 190;
                const y = 250 - Math.cos(angle) * 190;
                return (
                    <text key={i} x={x - 5} y={y + 5} fontSize="12" fill="#000">
                        {i === 0 ? 12 : i}
                    </text>
                );
            })}
        </svg>
    );
}
