// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
export default function SecondClockTry({r, scale, points, handleClick}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Вычисление углов для осей
    const minutes = time.getMinutes(); // Минутная стрелка

    const minuteAngle = minutes * 6; // 6 градусов на минуту


    return (
        <>
            <svg
                id="graph"
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500"
                transform={`rotate(${minuteAngle}, 250, 250)`}
                style={{
                    transform: `rotate(${minuteAngle}deg)`,
                    transition: 'transform 1s ease-in-out',
                    zIndex: -10
                }}
                onClick={(e) => handleClick(e)}
            >

                {/* Рисуем области (треугольник, прямоугольник, круг) */}
                <polygon
                    points={`250,250 ${250 - r * scale},250 250,${250 - (r * scale) / 2}`}
                    fill="#122028"
                    fillOpacity="0.6"
                />
                <rect
                    x={250 - (r * scale) / 2}
                    y="250"
                    width={(r * scale) / 2}
                    height={r * scale}
                    fill="#122028"
                    fillOpacity="0.6"
                />
                <path
                    fill="#122028"
                    fillOpacity="0.6"
                    d={`M 250 250 L ${250 + r * scale} 250 A ${r * scale} ${r * scale} 0 0 0 250 ${250 - r * scale}`}
                />

                {/* Отображаем точки */}
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={250 + point.x * scale}
                        cy={250 - point.y * scale}
                        r="4"
                        fill={point.hit ? 'green' : 'red'}
                    />
                ))}

                {/* Оси */}
                <line x1="0" y1="250" x2="500" y2="250" stroke="#000"/>
                <line x1="250" y1="0" x2="250" y2="500" stroke="#000"/>

                {/* Засечки и подписи */}
                {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                        {/* Линии и подписи по оси X */}
                        {i !== 0 && (
                            <>
                                <line x1={250 - i * scale} y1="248" x2={250 - i * scale} y2="252" stroke="#000"/>
                                <line x1={250 + i * scale} y1="248" x2={250 + i * scale} y2="252" stroke="#000"/>
                                <text x={250 - i * scale - 5} y="240" fill="#000">
                                    {-i}
                                </text>
                                <text x={250 + i * scale - 5} y="240" fill="#000">
                                    {i}
                                </text>
                            </>
                        )}

                        {/* Линии и подписи по оси Y */}
                        {i !== 0 && (
                            <>
                                <line
                                    x1="248"
                                    y1={250 - i * scale}
                                    x2="252"
                                    y2={250 - i * scale}
                                    stroke="#000"
                                />
                                <line
                                    x1="248"
                                    y1={250 + i * scale}
                                    x2="252"
                                    y2={250 + i * scale}
                                    stroke="#000"
                                />
                                <text x="256" y={250 - i * scale + 5} fill="#000">
                                    {i}
                                </text>
                                <text x="256" y={250 + i * scale + 5} fill="#000">
                                    {-i}
                                </text>
                            </>
                        )}

                        {/* Отображение нуля */}
                        {i === 0 && <text x="256" y="240" fill="#000">0</text>}
                    </React.Fragment>
                ))}

                {/* Стрелки */}
                <polygon points="250,0 255,5 245,5" fill="#000" stroke="#000"/>
                <polygon points="500,250 495,245 495,255" fill="#000" stroke="#000"/>


            </svg>

        </>
    );
}
