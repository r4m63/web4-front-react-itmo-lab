// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
export default function FirstClockTry({r, scale, points}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Вычисление углов для осей
    const hours = time.getHours() % 12; // Часовая стрелка (12 часов)
    const minutes = time.getMinutes(); // Минутная стрелка

    const hourAngle = (hours * 30) + (minutes / 60) * 30; // 30 градусов на час
    const minuteAngle = minutes * 6; // 6 градусов на минуту

    const TEST_POINTS = [
        {x: 1, y: 2, hit: true},
        {x: -3, y: 1, hit: false},
        {x: 2, y: -2, hit: true},
        {x: -1, y: -4, hit: false},
        {x: 0, y: 0, hit: true},
    ];

    return (
        <svg
            id="graph"
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
        >

            {/* Минутная */}
            <line x1="250" y1="0" x2="250" y2="500" stroke="#000" transform={`rotate(${minuteAngle}, 250, 250)`}/>
            <polygon points="250,0 255,5 245,5" fill="#000" stroke="#000"
                     transform={`rotate(${minuteAngle}, 250, 250)`}/>

            {/* Часовая */}
            <line x1="250" y1="100" x2="250" y2="400" stroke="#000" transform={`rotate(${hourAngle}, 250, 250)`}/>
            <polygon points="250,100 245,110 255,110" fill="#000" stroke="#000"
                     transform={`rotate(${hourAngle}, 250, 250)`}/>


            <polygon
                points={`250,250 ${250 - r * scale},250 250,${250 - (r * scale) / 2}`}
                fill="#122028"
                fillOpacity="0.6"
                transform={`rotate(${minuteAngle}, 250, 250)`}
            />
            <rect
                x={250 - (r * scale) / 2}
                y="250"
                width={(r * scale) / 2}
                height={r * scale}
                fill="#122028"
                fillOpacity="0.6"
                transform={`rotate(${minuteAngle}, 250, 250)`}
            />
            <path
                fill="#122028"
                fillOpacity="0.6"
                d={`M 250 250 L ${250 + r * scale} 250 A ${r * scale} ${r * scale} 0 0 0 250 ${250 - r * scale}`}
                transform={`rotate(${minuteAngle}, 250, 250)`}
            />

            {/* Точки */}
            {points.map((point, index) => (
                <circle
                    key={index}
                    cx={250 + point.x * scale}
                    cy={250 - point.y * scale}
                    r="4"
                    fill={point.hit ? 'green' : 'red'}
                    transform={`rotate(${minuteAngle}, 250, 250)`}
                />
            ))}

            <circle cx="250" cy="250" r="200" stroke="#ccc" fill="none"/>
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
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

/*
<circle cx="250" cy="250" r="200" stroke="#ccc" fill="none"/>
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x = 250 + Math.sin(angle) * 190;
                const y = 250 - Math.cos(angle) * 190;
                return (
                    <text key={i} x={x - 5} y={y + 5} fontSize="12" fill="#000">
                        {i === 0 ? 12 : i}
                    </text>
                );
            })}
*/
